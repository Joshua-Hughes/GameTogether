CREATE TABLE [UserProfile] (
  [id] int,
  [username] nvarchar(255),
  [email] nvarchar(255),
  [password] nvarchar(255),
  [firebaseUserId] nvarchar(255)
)
GO

CREATE TABLE [Topic] (
  [id] int,
  [topicTitle] nvarchar(255),
  [topicContent] nvarchar(255),
  [topicCreationDate] datetime,
  [topicAuthorId] int
)
GO

CREATE TABLE [ThreadComment] (
  [id] int,
  [topicId] int,
  [authorId] int,
  [threadComment] nvarchar(255),
  [commentCreationDate] datetime
)
GO

CREATE TABLE [UserLikes] (
  [id] int,
  [userId] int,
  [topicId] int
)
GO

ALTER TABLE [Topic] ADD FOREIGN KEY ([id]) REFERENCES [ThreadComment] ([topicId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([id]) REFERENCES [ThreadComment] ([authorId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([id]) REFERENCES [Topic] ([topicAuthorId])
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([id]) REFERENCES [UserLikes] ([userId])
GO

ALTER TABLE [Topic] ADD FOREIGN KEY ([id]) REFERENCES [UserLikes] ([topicId])
GO
