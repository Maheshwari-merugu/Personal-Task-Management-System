import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTasks, Task, CreateTaskData, UpdateTaskData } from '@/hooks/useTasks';
import { Header } from '@/components/layout/Header';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskDialog } from '@/components/tasks/TaskDialog';
import { TaskFilters, TaskFiltersState } from '@/components/tasks/TaskFilters';
import { TaskStats } from '@/components/tasks/TaskStats';
import { DeleteTaskDialog } from '@/components/tasks/DeleteTaskDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  const { loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { tasks, isLoading, createTask, updateTask, deleteTask, toggleStatus } = useTasks();
  
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);
  const [filters, setFilters] = useState<TaskFiltersState>({
    search: '',
    status: 'all',
    priority: 'all',
    sortBy: 'created_desc',
  });

  const filteredTasks = useMemo(() => {
    let result = tasks.filter((task) => {
      const matchesSearch = !filters.search || 
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description?.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    const priorityOrder = { high: 3, medium: 2, low: 1 };
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'created_asc': return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'due_date_asc': return (a.due_date || '9999') < (b.due_date || '9999') ? -1 : 1;
        case 'due_date_desc': return (b.due_date || '') > (a.due_date || '') ? 1 : -1;
        case 'priority_desc': return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'priority_asc': return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title_asc': return a.title.localeCompare(b.title);
        case 'title_desc': return b.title.localeCompare(a.title);
        default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
    return result;
  }, [tasks, filters]);

  const handleCreateTask = (data: CreateTaskData) => {
    createTask.mutate(data, {
      onSuccess: () => {
        setIsTaskDialogOpen(false);
      },
    });
  };

  const handleUpdateTask = (data: UpdateTaskData) => {
    updateTask.mutate(data, {
      onSuccess: () => {
        setEditingTask(null);
        setIsTaskDialogOpen(false);
      },
    });
  };

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      deleteTask.mutate(deletingTaskId, {
        onSuccess: () => {
          setDeletingTaskId(null);
        },
      });
    }
  };

  const handleToggleStatus = (id: string, status: Task['status']) => {
    toggleStatus.mutate({ id, status });
  };

  const openEditDialog = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingTask(null);
    setIsTaskDialogOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
          <Button onClick={openCreateDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
        
        <TaskStats tasks={tasks} />
        
        <TaskFilters filters={filters} onFiltersChange={setFilters} />
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ClipboardList className="h-16 w-16 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium text-foreground">No tasks found</h3>
            <p className="text-muted-foreground mt-1">
              {tasks.length === 0 
                ? "Get started by creating your first task"
                : "Try adjusting your filters"}
            </p>
            {tasks.length === 0 && (
              <Button onClick={openCreateDialog} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Create Task
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={handleToggleStatus}
                onEdit={openEditDialog}
                onDelete={(id) => setDeletingTaskId(id)}
                onNavigate={(id) => navigate(`/task/${id}`)}
              />
            ))}
          </div>
        )}
      </main>
      
      <TaskDialog
        open={isTaskDialogOpen}
        onOpenChange={setIsTaskDialogOpen}
        task={editingTask}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        isLoading={createTask.isPending || updateTask.isPending}
      />
      
      <DeleteTaskDialog
        open={!!deletingTaskId}
        onOpenChange={(open) => !open && setDeletingTaskId(null)}
        onConfirm={handleDeleteTask}
      />
    </div>
  );
}
