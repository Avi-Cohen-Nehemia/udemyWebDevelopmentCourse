// printing the array in reversed order
function printReverse(arr){
	for (var i = arr.length - 1; i >= 0; i--) {
		console.log(arr[i]);
	}
}


// detemaining if all the elements inside an array are the same
function isUniform(arr){
	var first = arr[0];
	for (var i = 1; i < arr.length; i++){
		if(arr[i] !== first){
			return false;
		}
	}
	return true;
}

// summing together all the numbers in an array
function sumArray(arr){
	var total = 0;
	arr.forEach(function(element){
		total += element;
	});
	return total;

}

// print the highest number in an array
function max(arr){
	var max = arr[0];
	for (var i = 1; i < arr.length; i++){
		if(arr[i] > max){
			max = arr[i];
		}
	}
	return max
}