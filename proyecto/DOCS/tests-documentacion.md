# Documentación de Tests Unitarios

**Proyecto:** Sistema de Gestión (Backend NestJS)  
**Framework de testing:** Jest + ts-jest  
**Cobertura objetivo:** 70%  
**Ubicación de los tests:** `src/tests/`  
**Comando para ejecutar:** `npx jest` o `npx jest --coverage`

---

## Índice

1. [Configuración general](#1-configuración-general)
2. [AuthService](#2-authservice)
3. [UsuarioService](#3-usuarioservice)
4. [RolService](#4-rolservice)
5. [ProductoIntrinsicValidationService](#5-productointrinsicvalidationservice)
6. [ProductoValidationService](#6-productovalidationservice)
7. [ProductoPrecioService](#7-productoprecioservice)
8. [ProductoService](#8-productoservice)
9. [MarcaService](#9-marcaservice)
10. [LineaService](#10-lineaservice)
11. [ClienteService](#11-clienteservice)
12. [ProveedorService](#12-proveedorservice)
13. [Utilidades comunes](#13-utilidades-comunes)
14. [Resumen de cobertura](#14-resumen-de-cobertura)

---

## 1. Configuración general

**Archivo:** `jest.config.js`

| Parámetro | Valor |
|---|---|
| `preset` | `ts-jest` |
| `testEnvironment` | `node` |
| `testMatch` | `src/tests/**/*.spec.ts` |
| `coverageDirectory` | `./coverage` |
| `coverageThreshold` (lines/functions/branches/statements) | 70% |

Los archivos excluidos de la cobertura son: módulos, entidades, DTOs, mappers, decoradores, interfaces, enums, guards, filtros, pipes y seeds. Esto concentra la métrica en la lógica de negocio real.

---

## 2. AuthService

**Archivo de test:** `src/tests/gestion-usuario/auth/auth.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-usuario/auth/application/services/auth.service.ts`  
**Dependencias mockeadas:** `JwtService`, `ConfigService`, `UsuarioService`, `bcrypt`

### 2.1 registrarUsuario

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Hashea la contraseña con bcrypt (salt 10) y delega la creación al UsuarioService | Cobertura | `bcrypt.hash` llamado con la contraseña original; `usuarioService.create` invocado; retorna el usuario creado |

### 2.2 login

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 2 | Usuario no encontrado por mail | Regla de negocio | Lanza `UnauthorizedException` |
| 3 | Contraseña incorrecta | Regla de negocio | Lanza `UnauthorizedException` |
| 4 | Credenciales válidas | Cobertura | Retorna `accessToken`, `refreshToken` y objeto `usuario` |
| 5 | Payload del JWT contiene `sub`, `personalId`, `roles` y `empresaId` correctos | Regla de negocio | `jwtService.sign` recibe el payload con los campos esperados |

### 2.3 verificarCodigo

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 6 | Mail no registrado | Regla de negocio | Lanza `BadRequestException` |
| 7 | Código de recuperación no coincide | Regla de negocio | Lanza `BadRequestException` |
| 8 | Código expirado | Regla de negocio | Lanza `BadRequestException` |
| 9 | Código válido y vigente | Cobertura | Retorna `true` |

### 2.4 cambiarContrasena

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 10 | Usuario no encontrado | Regla de negocio | Lanza `InternalServerErrorException` (el catch del servicio lo envuelve) |
| 11 | Flujo exitoso: hashea nueva contraseña y persiste | Cobertura | `bcrypt.hash` llamado con la nueva contraseña; `usuario.contrasena` actualizado; retorna mensaje de éxito |

### 2.5 enviarCodigoRecuperacion

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 12 | Mail no registrado | Regla de negocio | Lanza `UnauthorizedException` |

---

## 3. UsuarioService

**Archivo de test:** `src/tests/gestion-usuario/usuario/usuario.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-usuario/usuario/application/services/usuario.service.ts`  
**Dependencias mockeadas:** `IUsuarioRepository`, `RolService`, `bcrypt`

### 3.1 findOne

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Usuario existe | Cobertura | Retorna el objeto usuario |
| 2 | Usuario no existe | Cobertura | Lanza `NotFoundException` |

### 3.2 findByMail

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 3 | Mail no registrado | Cobertura | Retorna `null` |
| 4 | Mail registrado | Cobertura | Retorna el objeto usuario |

### 3.3 checkByMail

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 5 | Mail en uso por otro usuario | Regla de negocio | Lanza `ConflictException` |
| 6 | Mail pertenece al mismo usuario (edición) | Regla de negocio | No lanza excepción |

### 3.4 create

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 7 | Mail ya registrado | Regla de negocio | Lanza `ConflictException` |
| 8 | Rol inexistente | Regla de negocio | Lanza `NotFoundException` |
| 9 | Datos válidos | Cobertura | Retorna el usuario creado |

### 3.5 updateDatos

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 10 | Usuario no existe | Cobertura | Lanza `NotFoundException` |
| 11 | Nuevo mail ya en uso por otro usuario | Regla de negocio | Lanza `ConflictException` |
| 12 | Array de roles vacío | Regla de negocio | Lanza `BadRequestException` (el usuario debe tener al menos un rol) |
| 13 | Datos válidos | Cobertura | Actualiza `mail`, `denominacion` y `roles` en el objeto usuario |

### 3.6 updateContrasena

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 14 | `contrasenaNueva` y `confirmarContrasena` no coinciden | Regla de negocio | Lanza `BadRequestException` |
| 15 | Usuario no existe | Cobertura | Lanza `NotFoundException` |
| 16 | Contraseña actual incorrecta | Regla de negocio | Lanza `UnauthorizedException` |
| 17 | Flujo exitoso | Cobertura | Hashea la nueva contraseña y llama a `repository.updateContrasena` |

### 3.7 remove

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 18 | Usuario no existe | Cobertura | Lanza `NotFoundException` |
| 19 | Usuario existe | Cobertura | Llama a `repository.remove` con el ID correcto |

---

## 4. RolService

**Archivo de test:** `src/tests/gestion-usuario/rol/rol.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-usuario/rol/application/services/rol.service.ts`  
**Dependencias mockeadas:** `IRolRepository`

### 4.1 create

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Denominación ya existe | Regla de negocio | Lanza `ConflictException` |
| 2 | Denominación única | Cobertura | Retorna el rol creado |

### 4.2 update

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 3 | Rol no existe | Cobertura | Lanza `NotFoundException` |
| 4 | Nueva denominación ya en uso | Regla de negocio | Lanza `ConflictException` |
| 5 | Datos válidos | Cobertura | Retorna el rol actualizado |

### 4.3 findOne

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 6 | Rol no existe | Cobertura | Lanza `NotFoundException` |
| 7 | Rol existe | Cobertura | Retorna el objeto rol |

### 4.4 remove

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 8 | Rol no existe | Cobertura | Lanza `NotFoundException` |
| 9 | Rol existe | Cobertura | Llama a `repository.remove` |

### 4.5 findByIds

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 10 | Algún ID no existe en la base | Regla de negocio | Lanza `NotFoundException` |
| 11 | Todos los IDs existen | Cobertura | Retorna el array completo de roles |

---

## 5. ProductoIntrinsicValidationService

**Archivo de test:** `src/tests/gestion-productos/producto/producto-intrinsic-validation.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-productos/producto/domain/services/producto-intrinsic-validation.service.ts`  
**Dependencias mockeadas:** ninguna (servicio de dominio puro, sin inyecciones)

Este servicio implementa las reglas de negocio intrínsecas del producto, es decir, aquellas que no requieren consultar la base de datos.

### 5.1 validarDenominacion

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Denominación vacía (`""`) | Regla de negocio | Lanza `BadRequestException` |
| 2 | Denominación con solo espacios (`"   "`) | Regla de negocio | Lanza `BadRequestException` |
| 3 | Denominación supera 200 caracteres | Regla de negocio | Lanza `BadRequestException` |
| 4 | Denominación válida | Cobertura | No lanza excepción |

### 5.2 validarIds

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 5 | `marcaId` igual a 0 | Regla de negocio | Lanza `BadRequestException` |
| 6 | `lineaId` negativo | Regla de negocio | Lanza `BadRequestException` |

### 5.3 validarPrecios — jerarquía Mayorista ≤ Cliente ≤ Ocasional

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 7 | `precioMayorista` negativo | Regla de negocio | Lanza `BadRequestException` |
| 8 | `precioCliente` negativo | Regla de negocio | Lanza `BadRequestException` |
| 9 | `precioOcasional` negativo | Regla de negocio | Lanza `BadRequestException` |
| 10 | `precioMayorista` > `precioCliente` | Regla de negocio | Lanza `BadRequestException` |
| 11 | `precioCliente` > `precioOcasional` | Regla de negocio | Lanza `BadRequestException` |
| 12 | `precioMayorista` > `precioOcasional` | Regla de negocio | Lanza `BadRequestException` |
| 13 | Jerarquía correcta (100 ≤ 150 ≤ 200) | Cobertura | No lanza excepción |
| 14 | Precios iguales entre sí (100 = 100 = 100) | Cobertura | No lanza excepción |

### 5.4 validarAlicuotaIva

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 15 | `alicuotaIva` negativa | Regla de negocio | Lanza `BadRequestException` |
| 16 | `alicuotaIva` mayor a 100 | Regla de negocio | Lanza `BadRequestException` |
| 17 | `alicuotaIva` = 21 (valor típico) | Cobertura | No lanza excepción |
| 18 | `alicuotaIva` = 0 (exento) | Cobertura | No lanza excepción |

---

## 6. ProductoValidationService

**Archivo de test:** `src/tests/gestion-productos/producto/producto-validation.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-productos/producto/domain/services/producto-validation.service.ts`  
**Dependencias mockeadas:** ninguna (servicio de dominio puro)

Este servicio valida que las entidades relacionadas con un producto (Marca, Línea) no sean entidades reservadas del sistema.

### 6.1 validarEntidadesRelacionadas

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Marca y Línea válidas (`sistema = 0`) | Cobertura | No lanza excepción |
| 2 | Marca marcada como del sistema (`sistema = 1`) | Regla de negocio | Lanza `BadRequestException` |
| 3 | Línea marcada como del sistema (`sistema = 1`) | Regla de negocio | Lanza `BadRequestException` |
| 4 | Mensaje de error menciona el tipo "Marca" | Regla de negocio | El mensaje contiene la palabra `Marca` |
| 5 | Mensaje de error menciona el tipo "Línea" | Regla de negocio | El mensaje contiene la palabra `Línea` |

---

## 7. ProductoPrecioService

**Archivo de test:** `src/tests/gestion-productos/producto/producto-precio.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-productos/producto/application/services/producto-precio.service.ts`  
**Dependencias mockeadas:** `DataSource`, `Repository<Producto>`, `Repository<HistorialPrecio>`

### 7.1 registerPriceChange — reglas de negocio

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | `precioNuevo` igual a 0 | Regla de negocio | Lanza `BadRequestException` |
| 2 | `precioNuevo` negativo | Regla de negocio | Lanza `BadRequestException` |
| 3 | `motivo` vacío (`""`) | Regla de negocio | Lanza `BadRequestException` |
| 4 | `motivo` con solo espacios | Regla de negocio | Lanza `BadRequestException` |
| 5 | Producto no encontrado en la base | Cobertura | Lanza `NotFoundException` |
| 6 | Flujo exitoso con `EntityManager` externo | Cobertura | Llama a `manager.save` dos veces (producto + historial); retorna el historial guardado |

### 7.2 getHistorial

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 7 | Consulta el historial de un producto | Cobertura | Llama a `historialRepository.find` con `where`, `order` y `relations` correctos; retorna el array de historial |

---

## 8. ProductoService

**Archivo de test:** `src/tests/gestion-productos/producto/producto.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-productos/producto/application/services/producto.service.ts`  
**Dependencias mockeadas:** `IProductoRepository`, `LineaService`, `MarcaService`, `ProveedorService`, `UsuarioService`, `ProductoIntrinsicValidationService`, `ProductoValidationService`, `ProductoRelatedEntitiesValidator`, `ProductoUniquenessValidator`, `UsuarioValidator`, `ProductoDeletePolicy`

### 8.1 findEntityById

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Producto no existe | Cobertura | Lanza `NotFoundException` |
| 2 | Producto existe | Cobertura | Retorna la entidad |

### 8.2 findDtoById

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 3 | Producto no existe | Cobertura | Lanza `NotFoundException` |

### 8.3 remove

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 4 | Producto no existe | Cobertura | Lanza `NotFoundException` |
| 5 | Producto marcado como del sistema | Regla de negocio | Lanza `ForbiddenException` |
| 6 | Eliminación exitosa | Cobertura | Retorna mensaje con la denominación del producto |

### 8.4 incrementarStock / decrementarStock

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 7 | Producto no existe al intentar incrementar | Cobertura | Lanza `Error` con mensaje "no encontrado" |
| 8 | Incremento correcto (stock 10 + 5) | Regla de negocio | Retorna 15; `producto.stock` queda en 15 |
| 9 | Decremento correcto (stock 10 - 3) | Regla de negocio | Retorna 7; `producto.stock` queda en 7 |
| 10 | Stock `null` se trata como 0 antes de sumar | Regla de negocio | Retorna 10 al incrementar en 10 desde `null` |

### 8.5 existsProductosActivosByMarca

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 11 | Existen productos activos para la marca | Cobertura | Retorna `true` |
| 12 | No existen productos activos para la marca | Cobertura | Retorna `false` |

### 8.6 existsProductosActivosByLinea

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 13 | Existen productos activos para la línea | Cobertura | Retorna `true` |

---

## 9. MarcaService

**Archivo de test:** `src/tests/gestion-productos/marca/marca.service.spec.ts`  
**Clase bajo prueba:** `src/modules/gestion-productos/marca/application/services/marca.service.ts`  
**Dependencias mockeadas:** `IMarcaRepository`, `UsuarioService`, `PoliticaEliminacionMarca`

### 9.1 create

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 1 | Denominación ya existe | Regla de negocio | Lanza `ConflictException` |
| 2 | Denominación única | Cobertura | Retorna mensaje con la denominación creada |

### 9.2 update

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 3 | Marca no existe | Cobertura | Lanza `NotFoundException` |
| 4 | Marca es del sistema | Regla de negocio | Lanza `ForbiddenException` |
| 5 | Nueva denominación ya en uso | Regla de negocio | Lanza `ConflictException` |
| 6 | Actualización exitosa | Cobertura | Retorna mensaje con la denominación actualizada |

### 9.3 remove

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 7 | Marca no existe | Cobertura | Lanza `NotFoundException` |
| 8 | Marca es del sistema | Regla de negocio | Lanza `ForbiddenException` |
| 9 | Marca tiene productos activos asociados | Regla de negocio | Lanza `ConflictException` |
| 10 | Eliminación exitosa (sin productos activos) | Cobertura | Retorna mensaje con la denominación eliminada |

### 9.4 findEntityById

| # | Descripción | Tipo | Resultado esperado |
|---|---|---|---|
| 11 | Marca no existe | Cobertura | Lanza `NotFoundException` |
| 12 | Marca existe | Cobertura | Retorna la entidad |

---
