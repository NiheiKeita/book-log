# 技術書読書ログ サービス使用ガイド

## 1. 認証

1. ルートページ（`/`）で「Googleでログイン」ボタン押下。
2. Google OAuth の許可後、自動的に `/me/books` に遷移。
3. 右上メニューからログアウトすると再びトップへ戻る。

> ⚠️ 管理者は Google Cloud Console で `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REDIRECT_URI` を `.env` に設定してください。

## 2. 書籍登録フロー

1. `/books/register` で ISBN13（13桁）を入力し「検索」。
2. openBD → Google Books の順でメタデータを取得しプレビュー表示。
3. 内容を確認して「この本を登録する」を押下すると `user_books` に保存。
4. すでに登録済みの場合は通知のみ行い重複は作成されない。

## 3. マイページ（`/me/books`）

- 登録済みの本をタイトル・著者・ISBN で全文検索。
- リスト上のトグルで公開/非公開を即時切り替え。
- 「公開ページを表示」リンクから自分の公開 URL（`/u/{userId}`）へ移動。

## 4. 公開ページ（`/u/{userId}`）

- 公開フラグが立っている書籍のみ閲覧可能。
- 操作不可のカタログビュー。プロフィール画像・名前と公開冊数を表示。

## 5. API/インフラ補足

- 書籍検索 API: `POST /books/search`（認証必須、レスポンス `book`）
- 登録 API: `POST /user-books`
- 公開切替 API: `PATCH /user-books/{id}/visibility`
- ISBN メタデータ取得: openBD → Google Books のフォールバック構成

このガイドをチーム内 Wiki 等に引用すればプロダクト利用方法を迅速に共有できます。
