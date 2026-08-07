-- Corregir tabla users: quitar username, agregar nombre y apellido
ALTER TABLE users DROP COLUMN IF EXISTS username;
ALTER TABLE users ADD COLUMN IF NOT EXISTS nombre VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS apellido VARCHAR(100);

-- Hacer las columnas NOT NULL (si hay datos existentes, asignar valor por defecto primero)
UPDATE users SET nombre = 'Usuario' WHERE nombre IS NULL;
UPDATE users SET apellido = 'Apellido' WHERE apellido IS NULL;

ALTER TABLE users ALTER COLUMN nombre SET NOT NULL;
ALTER TABLE users ALTER COLUMN apellido SET NOT NULL;
