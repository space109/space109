const CATEGORY = [
    "전체",
    "판타지",
    "팝아트",
    "봄",
    "캘리그라피",
    "추상",
    "여름",
    "사물",
    "게임",
    "가을",
    "일상",
    "일러스트",
    "겨울",
    "기타",
]

const CategoryTitle = (index) => {
    return CATEGORY[index];
}

const CategoryId = (title) => {
    for (let i=0; i < CATEGORY.length; i++) {
        if (title === CATEGORY[i]) return i;
    }
}

export { CATEGORY, CategoryTitle, CategoryId };