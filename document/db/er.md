# 技術書読書ログ ER 図

```mermaid
erDiagram
    USERS ||--o{ USER_BOOKS : "登録"
    BOOKS ||--o{ USER_BOOKS : "紐付け"

    USERS {
        bigint id PK
        string name
        string email UNIQUE
        string google_sub UNIQUE
        string image_url
        timestamp email_verified_at
        string password
        string remember_token
        timestamp created_at
        timestamp updated_at
    }

    BOOKS {
        bigint id PK
        string isbn13 UNIQUE
        string title
        string title_normalized
        string author
        string author_normalized
        string publisher
        string published_year
        string image_url
        timestamp created_at
        timestamp updated_at
    }

    USER_BOOKS {
        bigint id PK
        bigint user_id FK -> USERS.id
        bigint book_id FK -> BOOKS.id
        boolean is_public
        timestamp created_at
        timestamp updated_at
    }
```

## テーブル概要

- **users**: Google OAuth でログインした利用者を保持。`google_sub` と `image_url` で外部アカウントと紐付ける。
- **books**: openBD / Google Books から取得した書籍マスタ。正規化カラム（`title_normalized`, `author_normalized`）で検索性能を向上。
- **user_books**: ユーザーが登録した書籍と公開フラグを管理する中間テーブル。公開設定はユーザー単位で変更可能。
