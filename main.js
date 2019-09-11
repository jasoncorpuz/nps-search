const searchUrl = 'https://developer.nps.gov/api/v1/parks'
const key = 'rPtixaVplfrfftuTBNovRKiDj6wGYk8xf2tEyabN'

//search button turns search values into query information
//query information = > formatted into url query info (https)
// then fetch, remember to handle errors
// render results

function handleSubmit() {
    console.log('handlesubmit working')
    $('form').submit(function(event){
        event.preventDefault();
        const search = $('.search').val();
        const maxResults = $('.number').val();
        console.log(search, maxResults)
        //getResults(search,maxResults)
        if(search.includes(',') || search.length === 2){
            console.log(search+"statecode "+maxResults);
            getNpsStateCode(search,maxResults);
          } else{
            console.log(search+"state/city name "+maxResults);
            getResults(search, maxResults);
            }
    
    })
};

function formatQueryString(params) {
   
    const queryItems = Object.keys(params)
    .map(key=> `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    return queryItems.join('&');
    
}


function getResults(query,maxResults=10){
    //generateurl then fetch
    console.log(`${query} test ${maxResults}`)
    const params = {
        'api_key': key,
        q: query,
        limit: maxResults
    };
    const queryString = formatQueryString(params)
    const url = searchUrl + '?' +queryString;
    console.log(url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        // .then(responseJson => console.log(JSON.stringify(responseJson))) // logs JSON to console
        .then(responseJson => renderInfo(responseJson)) //hand off
}



function getNpsStateCode(query,maxResults=10){
    //generateurl then fetch
    console.log(`${query} test ${maxResults}`)
    const params = {
        'api_key': key,
        stateCode: query,
        limit: maxResults
    };
    const queryString = formatQueryString(params)
    const url = searchUrl + '?' +queryString;
    console.log(url)
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        // .then(responseJson => console.log(JSON.stringify(responseJson))) // logs JSON to console
        .then(responseJson => renderInfo(responseJson)) //hand off
}

function renderInfo(responseJson){
    $('.resultsList').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('.resultsList').append(
            `<li>
            <h3>${responseJson.data[i].name}</h3>
            <a href="${responseJson.data[i].url}">website</a>
            <p>${responseJson.data[i].description}</p>
            </li>`
        )
    }
    console.log(responseJson)
    console.log(responseJson.data[0].name)
    console.log(responseJson.data[0].url)
    console.log(responseJson.data[0].description)

}

function callApp(){
    handleSubmit();
};

$(callApp);

