-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_deckID_fkey";

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_deckID_fkey" FOREIGN KEY ("deckID") REFERENCES "FlashcardDeck"("id") ON DELETE CASCADE ON UPDATE CASCADE;
