const genres = [
  {
    _id: 1,
    name: "일상",
  },
  {
    _id: 2,
    name: "개그",
  },
  {
    _id: 3,
    name: "러브코미디",
  },
  {
    _id: 4,
    name: "성인",
  },
  {
    _id: 5,
    name: "판타지",
  },
  {
    _id: 6,
    name: "서스펜스",
  },
  {
    _id: 7,
    name: "감동",
  },
  {
    _id: 8,
    name: "아이돌",
  },
  {
    _id: 9,
    name: "드라마",
  },
];

const episode = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "13회 이하",
    array: [1, 13],
  },
  {
    _id: 2,
    name: "26회 이하",
    array: [14, 26],
  },
  {
    _id: 3,
    name: "27회 이상",
    array: [27, 1500000],
  },
];

export { genres, episode };
