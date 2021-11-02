exports.commentCountToNumber = (arr) => {
  let newArr = [...arr];
  for (let i = 0; i < newArr.length; i++) {
    newArr[i].comment_count = parseInt(newArr[i].comment_count);
  }
  return newArr;
};
