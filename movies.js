/* eslint no-restricted-globals: 'off' */
// Turn duration of the movies from hours to minutes



export function turnHoursToMinutes(array) {
    let newArray = array.map(function(element) {
        let duration = element.duration;
        let arrayDuration = duration.split('h');
        if (arrayDuration.length == 1) {
            arrayDuration.unshift('0');
        }
        let hoursToMinutes = parseInt(arrayDuration[0]) * 60;
        let minutesNumber = parseInt(arrayDuration[1]);
        let durationInMinutes;
        if(!isNaN(minutesNumber)) {
           durationInMinutes = hoursToMinutes + minutesNumber;
        }else {
            durationInMinutes = hoursToMinutes;
        }
        //element.duration = durationInMinutes;
        const newElement = {
            ...element,
            duration: durationInMinutes
        }
        return newElement;
    })
    console.log(newArray);
    return newArray
}

//Obtenido por mi
// export function turnHoursToMinutes(array) {
//     return array.map(function() {
//         const [hours, mins] = movie[0].duration.split('  ').map(p => parseInt(p, 10));
//         const newTime = hours * 60 + mins;
//         return {
//             ...movie[0],
//             duration: newTime
//         }

//     })
// }


// Get the average of all rates with 2 decimals

export function ratesAverage(array) {
    let total = array.reduce(function(accumulator, currentValue){
        let valueNumber = parseFloat(currentValue.rate)
        if (isNaN(valueNumber)){
        valueNumber = 0;
    }
        accumulator += valueNumber;
        return accumulator;
    }, 0)

    const average = total / array.length;
    return +average.toFixed(2); // Podría ser con el parseFloat en vez del "+"
}
// console.log(ratesAverage);


// Get the average of Drama Movies

export function dramaMoviesRate(array){
    let dramaMovies = array.filter(function(element){
        if(element.genre.includes("Drama")){
            return element;
        }
        // console.log(element)
        
    })
    console.log(dramaMovies)
    if (dramaMovies.length > 0){
        return ratesAverage(dramaMovies); // Hacemos un call de la anterior para tener la media del genre.
    }else {
        return undefined
    }
    
}


// Order by time duration, in growing order
    
    // export function orderByDuration(array){
    //     const sortedArray = array.sort((a, b) => { // function (function(a, b)) o arrow ((a, b) => {}) function could be used
    //        if(a.duration === b.duration){
    //         return a.title.localeCompare(b.title)
    //        }else { 
    //        return a.duration - b.duration
    //     }})
    //     return sortedArray
    // }

    // Segunda forma de hacerlo, aunque la primera es más limpia y bonita
    export function orderByDuration(array){
        const sortedArray = array.sort((a, b) => {
            if (a.duration === b.duration) {
            if(a.title > b.title){
                return 1
            }
            if(a.title < b.title){
                return -1
            }
            return 0
           } else {
                return   a.duration - b.duration;
           }
        })
        return sortedArray
    }
console.log(orderByDuration)



// How many movies did STEVEN SPIELBERG

export function howManyMovies(array) {
    if(array.length === 0){
        return undefined
    }
    let stevenSpielberg = array.filter(function(element){
        if(element.director == 'Steven Spielberg' && element.genre.includes("Drama")){
            return element
        }
    })
    return `Steven Spielberg directed ${stevenSpielberg.length} drama movies!`
}


// Order by title and print the first 20 titles

// Forma larga de hacerlo, pero quizá más entendible
// export function orderAlphabetically(array) {
//     const newArray = [];
//     let limit = 20;

//     let sortedArray =  array.sort(function(a, b){
//         if(a.title > b.title){
//             return 1
//         }
//         if(a.title < b.title){
//             return -1
//         }
//         return 0
        
//     })
//     if(array.length < 20){
//         limit = array.length;
//     }
//     for(let i = 0; i < limit; i++){
//         newArray.push(array[i].title);
//     }
//     return newArray
// }

//Forma simplificada
export function orderAlphabetically(array) {
    const sortedArray = array.sort((a, b) => a.title.localeCompare(b.title));
  
    const newArray = [];
    let limit = 20;
    if (array.length < 20) {
      limit = array.length;
    }
    for (let i = 0; i < limit; i++) {
      newArray.push(sortedArray[i].title);
    }
  
    return newArray;
  }


// Best yearly rate average

export function bestYearAvg(movies) {
    // Si el array esta vacio devuelve undefined
    if (movies.length === 0) {
      return undefined;
    }
    // Si solo hay una película devuelve el return de la función
    if (movies.length === 1) {
      return `The best year was ${movies[0].year} with an average rate of ${movies[0].rate}`;
    }
  
    // Objeto para almacenar la información de cada año
    const yearAndRate = {};
  
    // Iterar sobre las películas y calcular el promedio por año
    movies.forEach(movie => {
      const year = movie.year;
      const rate = movie.rate;
    
      // Verificar si el año ya está en el objeto
      if (!yearAndRate[year]) {
        // Si no está, inicializarlo haciendo conteo y suma de rate en 0
        yearAndRate[year] = { sum: 0, count: 0 };
      }
      // Suma el rate y aumenta el conteo
      yearAndRate[year].sum += parseFloat(rate);
      yearAndRate[year].count++;
    });
  
    // Encontrar el año con el promedio más alto
    let bestYear;
    let bestAvg = 0;
  
    // Itera sobre cada año
    for (const year in yearAndRate) {
      const avg = yearAndRate[year].sum / yearAndRate[year].count;
  
      // Verifica si el promedio es más alto que el anterior
      if (avg > bestAvg || (avg === bestAvg && year < bestYear)) {
        bestAvg = avg;
        bestYear = year;
      }
    }
  
    return `The best year was ${bestYear} with an average rate of ${bestAvg.toFixed(1)}`;
  }
