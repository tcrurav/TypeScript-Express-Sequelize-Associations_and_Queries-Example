## Full Entity-Relationship Diagram (ERD) (with fields)

```mermaid
erDiagram
    Brand ||--o{ Bicycle : has
    Bicycle ||--o| BicycleDetail : has
    Customer ||--o{ Order : has
    Order ||--o{ OrderItem : has
    Bicycle ||--o{ OrderItem : has

    Brand {
        number id PK
        string name
    }

    Bicycle {
        number id PK
        number brandId FK
        string model
        string description
        number price
        number stock
    }

    BicycleDetail {
        number id PK
        number bicycleId FK
        string frameMaterial
        string wheelSize
        string weight
        string suspension
    }

    Customer {
        number id PK
        string name
        string email
    }

    Order {
        number id PK
        number customerId FK
        datetime orderDate
        string status
    }

    OrderItem {
        number id PK
        number orderId FK
        number bicycleId FK
        number quantity
        number unitPrice
    }
```

## Full Entity-Relationship Diagram (ERD) (without fields)

```mermaid
erDiagram
    Brand ||--o{ Bicycle : has
    Bicycle ||--o| BicycleDetail : has
    Customer ||--o{ Order : has
    Order ||--o{ OrderItem : has
    Bicycle ||--o{ OrderItem : has

    Brand {
    }

    Bicycle {
    }

    BicycleDetail {
    }

    Customer {
    }

    Order {
    }

    OrderItem {
    }
```

## Entity-Relationship Diagram (ERD) Brand 1:N Bicycle

```mermaid
erDiagram
    Brand ||--o{ Bicycle : has

    Brand {
        number id PK
        string name
    }

    Bicycle {
        number id PK
        number brandId FK
        string model
        string description
        float price
        number stock
    }
```

## Entity-Relationship Diagram (ERD) Brand 1:N Bicycle

```mermaid
erDiagram
    Brand ||--o{ Bicycle : has

    Brand {

    }

    Bicycle {

    }
```

## Entity-Relationship Diagram (ERD) Bicycle 1:1 BicycleDetail

```mermaid
erDiagram
    Bicycle ||--o| BicycleDetail : has

    Bicycle {
        number id PK
        number brandId FK
        string model
        string description
        number price
        number stock
    }

    BicycleDetail {
        number id PK
        number bicycleId FK
        string frameMaterial
        string wheelSize
        string weight
        string suspension
    }
```
## Entity-Relationship Diagram (ERD) Bicycle 1:1 BicycleDetail

```mermaid
erDiagram
    Bicycle ||--o| BicycleDetail : has

    Bicycle {

    }

    BicycleDetail {

    }
```

## Entity-Relationship Diagram (ERD) (with fields)

```mermaid
erDiagram
    Customer ||--o{ Order : has

    Customer {
        number id PK
        string name
        string email
    }

    Order {
        number id PK
        number customerId FK
        datetime orderDate
        string status
    }
```
## Entity-Relationship Diagram (ERD) (without  fields)

```mermaid
erDiagram
    Customer ||--o{ Order : has

    Customer {

    }

    Order {

    }
```
## Entity-Relationship Diagram (ERD) (with fields)

```mermaid
erDiagram
    Order ||--o{ OrderItem : has
    Bicycle ||--o{ OrderItem : has

    Bicycle {
        number id PK
        number brandId FK
        string model
        string description
        number price
        number stock
    }

    Order {
        number id PK
        number customerId FK
        datetime orderDate
        string status
    }

    OrderItem {
        number id PK
        number orderId FK
        number bicycleId FK
        number quantity
        number unitPrice
    }
```
## Entity-Relationship Diagram (ERD) (without fields)

```mermaid
erDiagram
    Order ||--o{ OrderItem : has
    Bicycle ||--o{ OrderItem : has

    Bicycle {

    }

    Order {

    }

    OrderItem {

    }
```