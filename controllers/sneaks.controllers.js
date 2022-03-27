const Sneaker = require('../models/Sneaker');
const stockXScraper = require('../scrapers/stockx-scraper');
const flightClubScraper = require('../scrapers/flightclub-scraper');
const goatScraper = require('../scrapers/goat-scraper');
const stadiumGoodsScraper = require('../scrapers/stadiumgoods-scraper');

module.exports = class Sneaks {
    /* findOne (shoeID, callback) {
     Sneaker.findOne({
       styleID: shoeID
     }, function (err, shoe) {
       if (err) {
         console.log(err);
         callback(err, null);
       }
       callback(null, shoe)
     });
   };*/

  /*exports.create = async function (req, res) {
    if (!req.params) {
      return res.status(400).send({
        message: "Shoe parameters can not be empty"
      });
    }
    getProducts(req.params.shoe, function (error, products) {
      if (error) {

        console.log(error)
        res.send("Product Not Found");
      } else {
        res.json(products);
      }
    });
  };*/
//   async getProducts(keyword, count = 40, callback) {

//     var productCounter = 0;
//     stockXScraper.getProductsAndInfo(keyword, count, function (error, products) {
//       if (error) {
//         callback(error, null)
//       }
//       products.forEach(function (shoe) {
//         var cbCounter = 0;
//         flightClubScraper.getLink(shoe, function () {
//           if (++cbCounter == 3) {
//             //if all shoes links have been parsed then return
//             if (productCounter++ + 1 == products.length) {
//               callback(null, products);
//             }

//           }
//         });

//         stadiumGoodsScraper.getLink(shoe, function () {
//           if (++cbCounter == 3) {
//             //if all shoes links have been parsed then return
//             if (productCounter++ + 1 == products.length) {
//               callback(null, products);
//             }

//           }
//         });

//         goatScraper.getLink(shoe, function () {
//           if (++cbCounter == 3) {
//             //if all shoes links have been parsed then return
//             if (productCounter++ + 1 == products.length) {
//               callback(null, products);
//             }

//           }
//         });
//       });

//     });


//   }

  getProductPrices(shoeID, callback) {
    const getPrices = (shoe) => {
      var cbCounter = 0;
      stockXScraper.getPrices(shoe, function () {
        cbCounter++;
        if (cbCounter == 3) {
          callback(null, shoe)
        }
      });
//       stadiumGoodsScraper.getPrices(shoe, function () {
//         cbCounter++;
//         if (cbCounter == 5) {
//           callback(null, shoe)
//         }

//       });
//       flightClubScraper.getPrices(shoe, function () {
//         cbCounter++;
//         if (cbCounter == 5) {
//           callback(null, shoe)
//         }

//       });
      goatScraper.getPrices(shoe, function () {
        cbCounter++;
        if (cbCounter == 3) {
          callback(null, shoe)
        }
      });
      goatScraper.getPictures(shoe, function () {
        cbCounter++;
        if (cbCounter == 3) {
          callback(null, shoe)
        }
      });
    }

    getProducts(shoeID, 1, function (error, products) {
      var shoeID1 = shoeID;
      var shoeID2 = shoeID;
      if (shoeID.includes("/")) {
        const shoeIDarr = shoeID.split("/");
        shoeID1 = shoeIDarr[0];
        shoeID2 = shoeIDarr[1];
      }
      var nodashproductsku = products[0].styleID.toLowerCase();
      var nodashid1 = shoeID1.toLowerCase();
      var nodashid2 = shoeID2.toLowerCase();
      if (nodashproductsku.includes("-")) {
        var nodashproductarr = nodashproductsku.split("-");
        nodashproductsku = "";
        for (let i = 0; i < nodashproductarr.length; i++) {
          nodashproductsku += nodashproductarr[i];
        }
      }
      if (nodashid1.includes("-")) {
        var nodashid1arr = nodashid1.split("-");
        nodashid1 = nodashid1arr[0] + nodashid1arr[1];
      }
      if (nodashid2.includes("-")) {
        var nodashid2arr = nodashid2.split("-");
        nodashid2 = nodashid2arr[0] + nodashid2arr[1];
      }
      if (error || !(nodashproductsku.includes(nodashid1) || nodashproductsku.includes(nodashid2))) {
        // console.log(new Error("No Products Found"));
        callback(new Error("No Products Found"), null);
        return;
      }
      getPrices(products[0]);
    });
  };

  /*findAll(callback) {
    Sneaker.find()
      .then(sneaks => {
        callback(null, sneaks);
      }).catch(err => {
        callback(err, null)
      });
  };*/

  getMostPopular(count, callback) {
    getProducts("", count, function (error, products) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, products)
      }
    });
  };
}


var getProducts = function (keyword, count = 40, callback) {
  var productCounter = 0;
  stockXScraper.getProductsAndInfo(keyword, count, function (error, products) {
    if (error) {
      callback(error, null)
      return;
    }
    products.forEach(function (shoe) {
      var cbCounter = 0;
//       flightClubScraper.getLink(shoe, function () {
//         if (++cbCounter == 3) {
//           //if all shoes links have been parsed then return
//           if (productCounter++ + 1 == products.length) {
//             callback(null, products);
//           }
//         }
//       });

//       stadiumGoodsScraper.getLink(shoe, function () {
//         if (++cbCounter == 3) {
//           //if all shoes links have been parsed then return
//           if (productCounter++ + 1 == products.length) {
//             callback(null, products);
//           }

//         }
//       });

      goatScraper.getLink(shoe, keyword, function () {
        if (++cbCounter == 1) {
          //if all shoes links have been parsed then return
          if (productCounter++ + 1 == products.length) {
            callback(null, products);
          }
        }
      });
    });
  });
}
