Diagrama de Entidad-Relación (ERD) Bicycle 1:N Brand:


```mermaid
erDiagram
    Bicycle {
        number id PK
        number brandId FK
        string model
        string description
        number price
        number stock
    }

    Brand {
        number id PK
        string name
    }

    Bicycle ||--o{ Brand : has
```