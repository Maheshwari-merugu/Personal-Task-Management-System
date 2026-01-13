import { useState } from 'react';
import { format } from 'date-fns';
import { Task } from '@/hooks/useTasks';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, MoreVertical, Pencil, Trash2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string, status: Task['status']) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onNavigate?: (id: string) => void;
}

const priorityColors = {
  low: 'bg-accent/20 text-accent-foreground border-accent',
  medium: 'bg-primary/20 text-primary border-primary',
  high: 'bg-destructive/20 text-destructive border-destructive',
};

const statusLabels = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
};

export function TaskCard({ task, onToggleStatus, onEdit, onDelete, onNavigate }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isCompleted = task.status === 'completed';
  
  const handleStatusToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newStatus = isCompleted ? 'pending' : 'completed';
    onToggleStatus(task.id, newStatus);
  };

  const handleCardClick = () => {
    if (onNavigate) {
      onNavigate(task.id);
    }
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && !isCompleted;

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:shadow-md cursor-pointer',
        isCompleted && 'opacity-60'
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            checked={isCompleted}
            onClick={(e) => e.stopPropagation()}
            onCheckedChange={() => {
              const newStatus = isCompleted ? 'pending' : 'completed';
              onToggleStatus(task.id, newStatus);
            }}
            className="mt-1"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className={cn(
                'font-medium text-foreground leading-tight',
                isCompleted && 'line-through text-muted-foreground'
              )}>
                {task.title}
              </h3>
              
              <div className={cn(
                'flex items-center gap-1 transition-opacity',
                isHovered ? 'opacity-100' : 'opacity-0'
              )}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onEdit(task)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => onDelete(task.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {task.description && (
              <p className={cn(
                'text-sm text-muted-foreground mt-1 line-clamp-2',
                isCompleted && 'line-through'
              )}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className={priorityColors[task.priority]}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </Badge>
              
              {!isCompleted && task.status === 'in_progress' && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {statusLabels[task.status]}
                </Badge>
              )}
              
              {task.due_date && (
                <div className={cn(
                  'flex items-center gap-1 text-xs',
                  isOverdue ? 'text-destructive' : 'text-muted-foreground'
                )}>
                  <Calendar className="h-3 w-3" />
                  {format(new Date(task.due_date), 'MMM d, yyyy')}
                  {isOverdue && <span className="font-medium">(Overdue)</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
