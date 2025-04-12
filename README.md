# サービス名
### 学習記録アプリ


# サービスの説明
日常の学習を記録できるアプリになります。  
学習内容と学習時間を記入し、登録ボタンを押すことで学習記録を登録でき、一覧に表示することができます。  
学習した時間の合計時間も表示することができます。

# 使用技術  
・JavaScript  
・React  
・Supabase  
・Firebase  
・Jest  
・React Testing Library  

# 起動の仕方
### 1.プロジェクトをクローンする  
```
$ git clone https://github.com/y-kei-yu/study-record.git
$ cd study-record
```
### 2.パッケージをインストールする  
```
npm i
```

### 3.supabaseのアカウントを作成する。  
### 4.新規プロジェクトを作成する(プロジェクト名はstudy-recor、データベースパスワードは適当)  
### 5. Table Editorで以下のテーブルを作成する
| colomn | type | option |
| :--- | :--- | :--- |
| id | uuid |  |
| title | varchar | non null |
| time | int4 | non null |
| create_at | timestamotz | |

### 6.`.env`ファイルを作成する
```
touch .env
```
### 7.`.env`ファイルに以下の内容を設定する  
```
VITE_SUPABASE_URL="SupabaseのProject URL"
VITE_SUPABASE_ANON_KEY="SupabaseのProject API Keys"
```  

### 8.以下のコマンドを実行する
```
npm run dev
```





