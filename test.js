//const pricing response is an example JSON object

const pricingResponse = {
  "ServiceRequest1": {
    "ds_F5531P02": {
      "output": [
        {
          "groupBy": {
            "F5531P02.55ASSTYP": "LABOUR"
          },
          "F5531P02.AEXP_SUM": 644427,
          "F5531P02.ECST_SUM": 405300
        },
        {
          "groupBy": {
            "F5531P02.55ASSTYP": "MATERIAL"
          },
          "F5531P02.AEXP_SUM": 1642728,
          "F5531P02.ECST_SUM": 1382210
        },
        {
          "groupBy": {
            "F5531P02.55ASSTYP": "PLANT"
          },
          "F5531P02.AEXP_SUM": 101760,
          "F5531P02.ECST_SUM": 64000
        },
        {
          "groupBy": {
            "F5531P02.55ASSTYP": "SUBCONT"
          },
          "F5531P02.AEXP_SUM": 150400,
          "F5531P02.ECST_SUM": 128000
        }
      ]
    }
  },
  "ServiceRequest2": {
    "ds_F5531P02": {
      "output": [
        {
          "groupBy": {
            "F5531P02.CPIL": "749618",
            "F5531P02.DSC1": "Increase to allocated capacity",
            "F5531P02.DSC2": "Northpower Network"
          },
          "F5531P02.AEXP_SUM": 730917
        }
      ]
    }
  },
  "ServiceRequest3": {
    "ds_F5531P02": {
      "output": [
        {
          "groupBy": {
            "F5531P02.55ASSTYP": "LABOUR"
          },
          "F5531P02.TQTY_SUM": 61
        }
      ]
    }
  }

}

const baseObj = pricingResponse.ServiceRequest1.ds_F5531P02.output
//make the object a single implementation deep
function flattenObj(obj, parent, res = {}){
  for(let key in obj){
      let propName = parent ? parent + key : key;
      if(typeof obj[key] == 'object'){
          flattenObj(obj[key], propName, res);
      } else {
          res[propName] = obj[key];
      } 
  }
  return res;
}
// const getValues = (obj) => {
  
//   //console.log(Object.entries(obj[0]))
//   //  obj.forEach((element) => {
//   //    if(Object.values(element) == "LABOUR") {
//   //     console.log("yes")
//   //    }
//   //    else {
//   //     console.log("no")
//   //    }
//   // });
//  }
//getValues(pricingResponse.ServiceRequest1, {})
const flattenedObject = flattenObj(pricingResponse)
//console.log(flattenedObject)

//console.log(flattenedObject['ServiceRequest1_ds_F5531P02_output_0_groupBy_F5531P02.55ASSTYP'])

const pricingArray = (Object.values(flattenedObject))
//console.log(pricingArray)

const newPricingObject = (array, newObject) => {
  
  for (const [i,value] of array.entries()) {
    
    if(value == 'LABOUR') {
      newObject.labourPrice= array[i+1],
      newObject.labourCost= array[i+2]
      console.log(i)

    } 
    
    if(value == 'MATERIAL') {
      newObject.materialPrice= array[i+1],
      newObject.materialCost= array[i+2]
      
    } 
    
    if(value == 'OTHER') {
      newObject.otherPrice= array[i+1],
      newObject.otherCost= array[i+2]
      
    } 

    if(value == 'PLANT') {
      newObject.plantPrice= array[i+1],
      newObject.plantCost= array[i+2]
      
    } 

    if(value == 'SUBCONT') {
      newObject.subcontPrice= array[i+1],
      newObject.subcontCost= array[i+2]
      
    } 
    // console.log(i)
    // console.log(newObject)
  }
 return newObject
}


const pricingYourNewObject = newPricingObject(pricingArray, {})

console.log(pricingYourNewObject)

//princingObject is what I want to turn the pricingResponse into

const pricingObject = {
  "priceLabour": Number,
  "priceMaterial": Number,
  "priceOther": Number,
  "pricePlant": Number,
  "priceSubcont": Number,
  "capacityCharge": Number,
  "priceTotalExcGST": Number,
  "priceTotalIncGST": Number,
  "costLabour": Number,
  "costMaterial": Number,
  "costOther": Number,
  "costPlant": Number,
  "costSubcont": Number,
  "costTotalExcGST": Number,
  "costTotalIncGST": Number
}