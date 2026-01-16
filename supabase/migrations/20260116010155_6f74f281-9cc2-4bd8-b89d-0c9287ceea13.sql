-- Add database-level input validation constraints to match client-side validation

-- Profiles table: full_name between 2 and 100 characters
ALTER TABLE public.profiles
  ADD CONSTRAINT full_name_length CHECK (full_name IS NULL OR char_length(full_name) BETWEEN 2 AND 100);

-- Tasks table: title between 1 and 200 characters, description max 1000 characters
ALTER TABLE public.tasks
  ADD CONSTRAINT title_length CHECK (char_length(title) BETWEEN 1 AND 200),
  ADD CONSTRAINT description_length CHECK (description IS NULL OR char_length(description) <= 1000);