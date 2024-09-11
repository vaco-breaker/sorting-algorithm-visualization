const mergeFuntion = (front, back) => {
    
    const resultArray = [];

	while (front.length !== 0 && back.length !== 0) {
		front[0] <= back[0] ? resultArray.push(front.shift()) : resultArray.push(back.shift());	
	}

    if (front.length === 0) resultArray.push(...back);
    if (back.length === 0) resultArray.push(...front);
    return resultArray;
}



export function* divideFuntion(array) {

    if (array.length === 1) return array;

    const pointIndex = Math.floor(array.length / 2);
    const frontArray = array.slice(0, pointIndex);
    const backArray = array.slice(pointIndex);
    const newArray = [...frontArray, ...backArray];
    yield newArray;
    
    

    const result = mergeFuntion(Array.from(divideFuntion(frontArray)), Array.from(divideFuntion(backArray)));

    return result;
}

