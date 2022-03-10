module.exports= (temp, data) => {
     let output = temp.replace(/{%PRODUCTNAME%}/g, data.productName);
     output = output.replace(/{%IMG%}/g, data.image);
     output = output.replace(/{%QUANTITY%}/g, data.quantity);
     output = output.replace(/{%PRICE%}/g, data.price);
     output = output.replace(/{%ID%}/g, data.id);
     output = output.replace(/{%FROM%}/g,data.from);
     output = output.replace(/{%NUTRIENTS%}/g, data.nutrients);
     output = output.replace(/{%DESCRIPTION%}/g, data.description);
     if (!data.organic) {
          output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
     };

     return output;
}