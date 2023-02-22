-- CreateTable
CREATE TABLE "FeedbackAccessToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackAccessToken_token_key" ON "FeedbackAccessToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "FeedbackAccessToken_identifier_token_key" ON "FeedbackAccessToken"("identifier", "token");
