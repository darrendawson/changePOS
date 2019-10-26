/*
  classes for importing and returning images
*/

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

class ImagePicker {
  getHeadshot(headshotID = 0) {
    if (headshotID < __headshots.length) {
      return (__headshots[headshotID]);
    } else {
      return __defaultHeadshot;
    }
  }
}

export default ImagePicker;
