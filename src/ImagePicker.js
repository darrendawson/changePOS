/*
  classes for importing and returning images
*/

// logo
import changeLogo from './Images/Logo/change_logo.png';


// profile images
import __defaultHeadshot from './Images/People/headshot_0.jpg';
import headshot1 from './Images/People/headshot_1.jpg';
import headshot2 from './Images/People/headshot_2.jpg';
import headshot3 from './Images/People/headshot_3.jpg';
import headshot4 from './Images/People/headshot_4.jpg';
import headshot5 from './Images/People/headshot_5.jpg';
import headshot6 from './Images/People/headshot_6.jpg';
import headshot7 from './Images/People/headshot_7.jpg';
import headshot8 from './Images/People/headshot_8.jpg';
import headshot9 from './Images/People/headshot_9.jpg';
import headshot10 from './Images/People/headshot_10.jpg';
import headshot11 from './Images/People/headshot_11.jpg';
import headshot12 from './Images/People/headshot_12.jpg';
import headshot13 from './Images/People/headshot_13.jpg';


// food images
import food1 from './Images/Food/sandwich_1.jpg';
import food2 from './Images/Food/sandwich_2.jpg';
import food3 from './Images/Food/sandwich_3.jpg';
import food4 from './Images/Food/sandwich_4.jpg';
import food5 from './Images/Food/sandwich_5.jpg';
import food6 from './Images/Food/sandwich_6.jpg';
import food7 from './Images/Food/sandwich_7.jpg';
import food8 from './Images/Food/sandwich_8.jpg';
import food9 from './Images/Food/sandwich_9.jpg';
import food10 from './Images/Food/sandwich_10.jpg';
import food11 from './Images/Food/sandwich_11.jpg';


const __headshots = [
  headshot1,
  headshot2,
  headshot3,
  headshot4,
  headshot5,
  headshot6,
  headshot7,
  headshot8,
  headshot9,
  headshot10,
  headshot11,
  headshot12,
  headshot13,
];


const __food = [
  food1,
  food2,
  food3,
  food4,
  food5,
  food6,
  food7,
  food8,
  food9,
  food10,
  food11
];

// Image Picker ----------------------------------------------------------------

class ImagePicker {
  getHeadshot(headshotID = 0) {
    if (headshotID < __headshots.length) {
      return (__headshots[headshotID]);
    } else {
      return __defaultHeadshot;
    }
  }

  getFood(foodID = 0) {
    if (foodID < __food.length) {
      return (__food[foodID]);
    } else {
      return __food[0];
    }
  }

  getChangeLogo() {
    return changeLogo;
  }
}

export default ImagePicker;
