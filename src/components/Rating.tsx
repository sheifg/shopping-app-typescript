type RatingProps = {
  rating: number;
};

export default function Rating({ rating }: RatingProps) {
  // To have stars it is necessary an array of length of rating
  // Creating this array

  const generateStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < Math.round(rating); i++) {
      stars.push(i);
    }
    return stars;
  };

  const fillStars = generateStars(rating);
  // rating 4.2 => it will generate [0,1,2,3]
  // rating 3.3 => [0,1,2]
  const unFilledStars = generateStars(5 - rating);
  // rating 4.2 => it will generate [0]
  // rating 3.3 => [0,1]

  //! Instead of the previous ones, it can be used as follow:
  // If there is a mandatory parameter in any function and if it is not wanted to use it, it can be seen _ as a placeholder
  // In a callback function it is necessary the first parameter(element) and second parameter(index).
  // - The first parameter will be item and is iterable, but it is not needed it, so it is used _
  // - The second parameter is the function

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#mapfn
  // The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object
  // Array.from(arrayLike)
  // Array.from(arrayLike, mapFn) --> it is used in this file
  // Array.from(arrayLike, mapFn, thisArg)

  // mapFn: a function to call on every element of the array. If provided, every value to be added to the array is first passed through this function, and mapFn's return value is added to the array instead. The function is called with the following arguments:
  // - element: the current element being processed in the array
  // - index: the index of the current element being processed in the array
  //, mapFn
  // const fillStars2 = Array.from({ length: Math.round(rating) }, (_, i) => i);
  // const unFilledStars2 = Array.from(
  //  { length: 5 - Math.round(rating) },
  //  (_, i) => i
  //);

  return (
    <>
      {/* <i className="bi bi-star-fill text-yellow-300 mr-1"></i>
       <i className="bi bi-star-fill text-yellow-300 mr-1"></i>
       <i className="bi bi-star-fill text-yellow-300 mr-1"></i>
       <i className="bi bi-star-fill text-yellow-300 mr-1"></i> */}
      {fillStars.map((item) => (
        <i key={item} className="bi bi-star-fill text-yellow-300 mr-1"></i>
      ))}
      {unFilledStars.map((item) => (
        <i key={item} className="bi bi-star-fill text-gray-200 mr-1"></i>
      ))}

      <span className="bg-blue-100 text-blue-800 text-sm font-semibold mx-2 px-2.5 py-0.5 dark:bg-blue-200">
        {rating.toFixed(1)}
      </span>
    </>
  );
}
