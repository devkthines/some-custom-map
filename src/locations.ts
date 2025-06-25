export type RawLocation = {
    id: string;
    name: string;
    address: string;
    lat: number;
    lng: number;
  };
  
  export const rawLocations: RawLocation[] = [
    { id: '1', name: 'Food 4 Less', address: '2025 N Dinuba Blvd, Visalia, CA 93291', lat: 36.3543, lng: -119.3085 },
    { id: '2', name: 'R-N Market', address: '737 S Lovers Ln, Visalia, CA 93292', lat: 36.3155, lng: -119.2699 },
    { id: '3', name: 'Walmart Supercenter', address: '1819 E Noble Ave, Visalia, CA 93292', lat: 36.3335, lng: -119.2810 },
    { id: '4', name: 'Save Mart', address: '1591 E Noble Ave, Visalia, CA 93277', lat: 36.3324, lng: -119.2862 },
    { id: '5', name: 'Foodmaxx', address: '1550 N Ben Maddox Way, Visalia, CA 93292', lat: 36.3477, lng: -119.2676 },
    { id: '6', name: 'Vallarta Supermarkets', address: '3112 N Dinuba Blvd, Visalia, CA 93291', lat: 36.3787, lng: -119.3112 },
    { id: '7', name: 'Walmart Neighborhood Market', address: '1320 N Demaree St, Visalia, CA 93291', lat: 36.3392, lng: -119.3382 },
    { id: '8', name: 'Save Mart', address: '5201 W Goshen Ave, Visalia, CA 93291', lat: 36.3323, lng: -119.3718 },
    { id: '9', name: 'Save Mart', address: '5203 W Walnut Ave, Visalia, CA 93277', lat: 36.3127, lng: -119.3753 },
    { id: '10', name: 'Best Buy Market IGA', address: '1300 W Walnut Ave, Visalia, CA 93277', lat: 36.3124, lng: -119.3047 },
    { id: '11', name: 'Grocery Outlet', address: '2323 S Mooney Blvd, Visalia, CA 93277', lat: 36.2961, lng: -119.3134 },
    { id: '12', name: 'WinCo Foods', address: '3939 W Caldwell Ave, Visalia, CA 93277', lat: 36.2951, lng: -119.3539 },
    { id: '13', name: 'Walmart Supercenter', address: '3750 S Mooney Blvd, Visalia, CA 93277', lat: 36.2855, lng: -119.3223 },
    { id: '14', name: 'Costco Wholesale', address: '1405 W Cameron Ave, Visalia, CA 93277', lat: 36.2832, lng: -119.3185 },
    { id: '15', name: 'Sprouts Farmers Market', address: '3501 S Mooney Blvd Unit 120, Visalia, CA 93277', lat: 36.2913, lng: -119.3200 },
    { id: '16', name: 'Food 4 Less', address: '2819 Highland Ave, Selma, CA 93662', lat: 36.5806, lng: -119.6173 },
    { id: '17', name: 'Walmart Supercenter', address: '3400 E Floral Ave, Selma, CA 93662', lat: 36.5713, lng: -119.5869 },
    { id: '18', name: 'La Estrella Market #2', address: '1860 Bauder St, Selma, CA 93662', lat: 36.5789, lng: -119.6134 },
    { id: '19', name: 'El Mercado & Discount Center', address: '2440 McCall Ave, Selma, CA 93662', lat: 36.5822, lng: -119.6149 },
    { id: '20', name: 'Food 4 Less', address: '1290 W Henderson Ave, Porterville, CA 93257', lat: 36.0653, lng: -119.0484 },
    { id: '21', name: 'Walmart', address: '1250 W Henderson Ave, Porterville, CA 93257', lat: 36.0643, lng: -119.0465 },
    { id: '22', name: 'Trader Joe\'s', address: '8478 N Friant Rd, Fresno, CA 93720', lat: 36.8574, lng: -119.7797 },
    { id: '23', name: 'Vons', address: '1650 Herndon Ave, Clovis, CA 93611', lat: 36.8376, lng: -119.6822 },
    { id: '24', name: 'Save Mart', address: '1107 E Champlain Dr, Fresno, CA 93720', lat: 36.8598, lng: -119.7620 },
    { id: '25', name: 'Costco Wholesale', address: '7100 N Abby St, Fresno, CA 93720', lat: 36.8448, lng: -119.7755 },
    { id: '26', name: 'Grocery Outlet', address: '1093 Bellevue Rd, Atwater, CA 95301', lat: 37.3522, lng: -120.6056 },
    { id: '27', name: 'Walmart Supercenter', address: '800 Commerce Ave, Atwater, CA 95301', lat: 37.3525, lng: -120.6105 },
    { id: '28', name: 'Raley\'s', address: '3550 G St, Merced, CA 95340', lat: 37.3297, lng: -120.4834 },
    { id: '29', name: 'Sprouts', address: '171 E Yosemite Ave, Merced, CA 95340', lat: 37.3046, lng: -120.4712 },
    { id: '30', name: 'Walmart', address: '3055 Loughborough Dr, Merced, CA 95348', lat: 37.3067, lng: -120.5182 },
    { id: '31', name: 'Cardenas Markets', address: '1136-1140 W Main St, Merced, CA 95340', lat: 37.3002, lng: -120.4932 },
    { id: '32', name: 'Smart & Final', address: '2237 W Cleveland Ave, Madera, CA 93637', lat: 36.9618, lng: -120.0902 },
    { id: '33', name: 'Save Mart', address: '1225 W Olive Ave, Madera, CA 93637', lat: 36.9564, lng: -120.0866 },
    { id: '34', name: 'Walmart Supercenter', address: '1977 W Cleveland Ave, Madera, CA 93637', lat: 36.9635, lng: -120.0936 },
    { id: '35', name: 'Grocery Outlet', address: '1930 W Cleveland Ave, Madera, CA 93637', lat: 36.9627, lng: -120.0931 },
    { id: '36', name: 'Vallarta Supermarkets', address: '1467 Country Club Dr, Madera, CA 93638', lat: 36.9476, lng: -120.0545 }
  ];
  