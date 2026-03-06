// import all food/drink images
import colddesertHalohalo from '../assets/Foods/colddesert_halohalo_30-60.png';
import colddesertMaisconyelo from '../assets/Foods/colddesert_maisconyelo_30-50.png';
import colddesertSabaconyelo from '../assets/Foods/colddesert_sabaconyelo_30-50.png';

import floatChuckie from '../assets/Foods/float_chuckie_49-59.png';
import floatCoke from '../assets/Foods/float_coke_49-59.png';
import floatDutchmilk from '../assets/Foods/float_dutchmilk_49-59.png';
import floatMilo from '../assets/Foods/float_milo_49-59.png';

import floatfruitsodaBlueberry from '../assets/Foods/floatfruitsoda_blueberry_39-49.png';
import floatfruitsodaBluelemonade from '../assets/Foods/floatfruitsoda_bluelemonade_39-49.png';
import floatfruitsodaGreenapple from '../assets/Foods/floatfruitsoda_greenapple_39-49.png';
import floatfruitsodaKiwi from '../assets/Foods/floatfruitsoda_kiwi_39-49.png';
import floatfruitsodaLychee from '../assets/Foods/floatfruitsoda_lychee_39-49.png';
import floatfruitsodaStrawberry from '../assets/Foods/floatfruitsodastrawberry_39-49.png';

import fruitsodaBlueberry from '../assets/Foods/fruitsoda_blueberry_29-39.png';
import fruitsodaBluelemonade from '../assets/Foods/fruitsoda_bluelemonade_29-39.png';
import fruitsodaGreenapple from '../assets/Foods/fruitsoda_greenapple_29-39.png';
import fruitsodaKiwi from '../assets/Foods/fruitsoda_kiwi_29-39.png';
import fruitsodaLychee from '../assets/Foods/fruitsoda_lychee_29-39.png';
import fruitsodaStrawberry from '../assets/Foods/fruitsoda_strawberry_29-39.png';

import icecreamCaramel from '../assets/Foods/icecream_caramel_25.png';
import icecreamChocolate from '../assets/Foods/icecream_chocolate_25.png';
import icecreamPlain from '../assets/Foods/icecream_plain_20.png';
import icecreamStrawberry from '../assets/Foods/icecream_strawberry_25.png';
import icecreamSugarcone from '../assets/Foods/icecream_sugarcone_15.png';
import icecreamWafercone from '../assets/Foods/icecream_wafercone_10.png';

import picapicaFries from '../assets/Foods/picapica_fries_25-50-75-100.png';
import picapicaSiomai from '../assets/Foods/picapica_siomai_5.png';

import shakeAvocadoGraham from '../assets/Foods/shake_avocado_graham_40-60.png';
import shakeChocokisses from '../assets/Foods/shake_chocokisses_40-60.png';
import shakeMangograham from '../assets/Foods/shake_mangograham_40-60.png';

export const categories = [
    "Cold Dessert",
    "Floats",
    "Soda",
    "Ice Cream",
    "Snacks",
    "Shakes"
];

// Note on prices: the lowest price from the filename range is used as the base price.
export const menuFallback = [
    // Cold Desserts
    { id: 1, name: "Halo Halo", price: 30, category: "Cold Dessert", image: colddesertHalohalo, available: true },
    { id: 2, name: "Mais Con Yelo", price: 30, category: "Cold Dessert", image: colddesertMaisconyelo, available: true },
    { id: 3, name: "Saba Con Yelo", price: 30, category: "Cold Dessert", image: colddesertSabaconyelo, available: true },

    // Floats
    { id: 4, name: "Chuckie Float", price: 49, category: "Floats", image: floatChuckie, available: true },
    { id: 5, name: "Coke Float", price: 49, category: "Floats", image: floatCoke, available: true },
    { id: 6, name: "Dutchmilk Float", price: 49, category: "Floats", image: floatDutchmilk, available: true },
    { id: 7, name: "Milo Float", price: 49, category: "Floats", image: floatMilo, available: true },

    // Float Fruit Sodas (Mapped to Floats category)
    { id: 8, name: "Blueberry Float Soda", price: 39, category: "Floats", image: floatfruitsodaBlueberry, available: true },
    { id: 9, name: "Blue Lemonade Float Soda", price: 39, category: "Floats", image: floatfruitsodaBluelemonade, available: true },
    { id: 10, name: "Green Apple Float Soda", price: 39, category: "Floats", image: floatfruitsodaGreenapple, available: true },
    { id: 11, name: "Kiwi Float Soda", price: 39, category: "Floats", image: floatfruitsodaKiwi, available: true },
    { id: 12, name: "Lychee Float Soda", price: 39, category: "Floats", image: floatfruitsodaLychee, available: true },
    { id: 13, name: "Strawberry Float Soda", price: 39, category: "Floats", image: floatfruitsodaStrawberry, available: true },

    // Fruit Sodas
    { id: 14, name: "Blueberry Soda", price: 29, category: "Soda", image: fruitsodaBlueberry, available: true },
    { id: 15, name: "Blue Lemonade Soda", price: 29, category: "Soda", image: fruitsodaBluelemonade, available: true },
    { id: 16, name: "Green Apple Soda", price: 29, category: "Soda", image: fruitsodaGreenapple, available: true },
    { id: 17, name: "Kiwi Soda", price: 29, category: "Soda", image: fruitsodaKiwi, available: true },
    { id: 18, name: "Lychee Soda", price: 29, category: "Soda", image: fruitsodaLychee, available: true },
    { id: 19, name: "Strawberry Soda", price: 29, category: "Soda", image: fruitsodaStrawberry, available: true },

    // Ice Cream
    { id: 20, name: "Caramel Ice Cream", price: 25, category: "Ice Cream", image: icecreamCaramel, available: true },
    { id: 21, name: "Chocolate Ice Cream", price: 25, category: "Ice Cream", image: icecreamChocolate, available: true },
    { id: 22, name: "Plain Ice Cream", price: 20, category: "Ice Cream", image: icecreamPlain, available: true },
    { id: 23, name: "Strawberry Ice Cream", price: 25, category: "Ice Cream", image: icecreamStrawberry, available: true },
    { id: 24, name: "Sugar Cone Ice Cream", price: 15, category: "Ice Cream", image: icecreamSugarcone, available: true },
    { id: 25, name: "Wafer Cone Ice Cream", price: 10, category: "Ice Cream", image: icecreamWafercone, available: true },

    // Snacks (Pica Pica)
    { id: 26, name: "Fries", price: 25, category: "Snacks", image: picapicaFries, available: true },
    { id: 27, name: "Siomai", price: 5, category: "Snacks", image: picapicaSiomai, available: true },

    // Shakes
    { id: 28, name: "Avocado Graham Shake", price: 40, category: "Shakes", image: shakeAvocadoGraham, available: true },
    { id: 29, name: "Choco Kisses Shake", price: 40, category: "Shakes", image: shakeChocokisses, available: true },
    { id: 30, name: "Mango Graham Shake", price: 40, category: "Shakes", image: shakeMangograham, available: true }
];
