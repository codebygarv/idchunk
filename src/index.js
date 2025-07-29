const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-';

const generateRandom = (length) =>{
    length = length || 10;
    let result = '';
    const valuesLength = values.length;
    
    for (let i = 0; i < length; i++) {
        result += values.charAt(Math.floor(Math.random() * valuesLength));
    }
    
    return result;
}

const randomNumber = generateRandom(3);

console.log(Math.random());