import axios from "axios";
import * as $ from 'jquery';

const $showsList = $("#showsList");
const $episodesArea = $("#episodesArea");
const $searchForm = $("#searchForm");

const DEFAULTIMAGE = "https://tinyurl.com/tv-missing";

const TVMAZEURL: string = "https://api.tvmaze.com/search/shows?q=";

// image object might cause problems
interface ShowDataInterface {
  id: number,
  name: string,
  summary: string,
  image: string,
}

interface ShowAPIDataInterface {
  id: number,
  name: string,
  summary: string,
  image: object,
}

//TODO: Look into potential for an interface/ On the show.
//TODO: Defualt image how to?

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

//  :Promise<object[]>
async function getShowsByTerm(term: string): Promise<ShowDataInterface[]> {
  console.log("getSHowsByTerm",term);
  // TODO: Make an ajax request to TVMAZE API
  // Get TvMazd api url
  // ajax already installed
  // make ajax req to the TvMaze url with the term in the body>?
  // Return the response.
  // Example: https://api.tvmaze.com/search/shows?q=girls

  //TODO: Add typing
  // make request
  // map over array -> showsList.data
  // .show -> .id, .name, .image, .summary
  const showsList = await axios.get(TVMAZEURL + term);

  // id: s.show.id
  let shows: ShowDataInterface[] = showsList.data.map(
    // TODO: lowercase string for typing, number, etc
    (s: {
      show: {
        id: number,
        name: string,
        summary: string,
        image: ({original?:string} | null);
      };
    }
    ):ShowDataInterface => {
      return (
        {
          "id": s.show.id,
          "name": s.show.name,
          "summary": s.show.summary,
          "image": !s.show.image? DEFAULTIMAGE : s.show.image?.original
        });
    });
    console.log(shows);
  return shows;





  // ADD: Remove placeholder & make request to TVMaze search shows API.
  // return [
  //   {
  //     id: 1767,
  //     name: "The Bletchley Circle",
  //     summary:
  //       `<p><b>The Bletchley Circle</b> follows the journey of four ordinary
  //          women with extraordinary skills that helped to end World War II.</p>
  //        <p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their
  //          normal lives, modestly setting aside the part they played in
  //          producing crucial intelligence, which helped the Allies to victory
  //          and shortened the war. When Susan discovers a hidden code behind an
  //          unsolved murder she is met by skepticism from the police. She
  //          quickly realises she can only begin to crack the murders and bring
  //          the culprit to justice with her former friends.</p>`,
  //     image:
  //         "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
  //   }
  // ]
}


/** Given list of shows, create markup for each and to DOM */
// TODO: Typing!
function populateShows(shows:ShowDataInterface[]):void {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img
              src="${show.image}"
              alt="Bletchly Circle San Francisco"
              class="w-25 me-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>
       </div>
      `);

    $showsList.append($show);
  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val() as string;
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }