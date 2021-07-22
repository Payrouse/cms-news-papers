-- Seed roles

INSERT INTO public.roles (name, description, created_at, updated_at, role_id)
VALUES ('ADMIN', 'Administrador', DEFAULT, DEFAULT, DEFAULT);

INSERT INTO public.roles (name, description, created_at, updated_at, role_id)
VALUES ('PUBLISHER', 'Jefe de publicación', DEFAULT, DEFAULT, DEFAULT);

INSERT INTO public.roles (name, description, created_at, updated_at, role_id)
VALUES ('JOURNALIST', 'Periodista', DEFAULT, DEFAULT, DEFAULT);

INSERT INTO public.roles (name, description, created_at, updated_at, role_id)
VALUES ('USER', 'Usuario basico (lector)', DEFAULT, DEFAULT, DEFAULT);