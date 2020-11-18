import React from 'react'

// const data = {
//   title: 'The Subtle Art of Not Giving a F*ck',
//   subtitle: 'A Counterintuitive Approach to Living a Good Life',
//   authors: ['Mark Manson'],
//   publisher: 'HarperCollins',
//   publishedDate: '2016-09-13',
//   description:
//     '#1 New York Times Bestseller Over 1 million copies sold In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be "positive" all the time so that we can truly become better, happier people. For decades, we’ve been told that positive thinking is the key to a happy, rich life. "F**k positivity," Mark Manson says. "Let’s be honest, shit is f**ked and we have to live with it." In his wildly popular Internet blog, Manson doesn’t sugarcoat or equivocate. He tells it like it is—a dose of raw, refreshing, honest truth that is sorely lacking today. The Subtle Art of Not Giving a F**k is his antidote to the coddling, let’s-all-feel-good mindset that has infected American society and spoiled a generation, rewarding them with gold medals just for showing up. Manson makes the argument, backed both by academic research and well-timed poop jokes, that improving our lives hinges not on our ability to turn lemons into lemonade, but on learning to stomach lemons better. Human beings are flawed and limited—"not everybody can be extraordinary, there are winners and losers in society, and some of it is not fair or your fault." Manson advises us to get to know our limitations and accept them. Once we embrace our fears, faults, and uncertainties, once we stop running and avoiding and start confronting painful truths, we can begin to find the courage, perseverance, honesty, responsibility, curiosity, and forgiveness we seek. There are only so many things we can give a f**k about so we need to figure out which ones really matter, Manson makes clear. While money is nice, caring about what you do with your life is better, because true wealth is about experience. A much-needed grab-you-by-the-shoulders-and-look-you-in-the-eye moment of real-talk, filled with entertaining stories and profane, ruthless humor, The Subtle Art of Not Giving a F**k is a refreshing slap for a generation to help them lead contented, grounded lives.',
//   industryIdentifiers: [
//     {
//       type: 'ISBN_13',
//       identifier: '9780062457738',
//     },
//     {
//       type: 'ISBN_10',
//       identifier: '006245773X',
//     },
//   ],
//   readingModes: {
//     text: true,
//     image: false,
//   },
//   pageCount: 224,
//   printType: 'BOOK',
//   categories: ['Self-Help'],
//   averageRating: 4,
//   ratingsCount: 13,
//   maturityRating: 'NOT_MATURE',
//   allowAnonLogging: true,
//   contentVersion: '1.22.25.0.preview.2',
//   panelizationSummary: {
//     containsEpubBubbles: false,
//     containsImageBubbles: false,
//   },
//   imageLinks: {
//     smallThumbnail:
//       'http://books.google.com/books/content?id=yng_CwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
//     thumbnail:
//       'http://books.google.com/books/content?id=yng_CwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
//   },
//   language: 'en',
//   previewLink:
//     'http://books.google.co.id/books?id=yng_CwAAQBAJ&printsec=frontcover&dq=The+subtle&hl=&cd=1&source=gbs_api',
//   infoLink: 'https://play.google.com/store/books/details?id=yng_CwAAQBAJ&source=gbs_api',
//   canonicalVolumeLink: 'https://play.google.com/store/books/details?id=yng_CwAAQBAJ',
//   libraryType: 'finished',
// }

const Book = ({ book, onClick }) => {
  return (
    <div onClick={(_) => onClick()}>
      <div
        className="book relative rounded-lg overflow-hidden cursor-pointer"
        style={{
          paddingBottom: `153%`,
        }}
      >
        <img className="w-full h-full absolute object-cover" src={book.imageLinks.thumbnail} alt={book.title} />
        <div
          className="info absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%)`,
          }}
        >
          <div className="w-full h-full flex items-end p-2">
            <div className="text">
              <p
                className="text-lg font-bold overflow-hidden"
                style={{
                  maxHeight: `112px`,
                }}
              >
                {book.title}
              </p>
              <p className="opacity-75">by {book.authors[0]}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Book
