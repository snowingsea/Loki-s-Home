//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    guide: [
      [
        { weight: 0.9, grams: 50 },
        { weight: 2.3, grams: 110 },
        { weight: 3.6, grams: 150 },
        { weight: 4.5, grams: 175 },
        { weight: 9.1, grams: 295 },
        { weight: 18, grams: 495 },
        { weight: 27, grams: 660 },
        { weight: 36, grams: 815 },
        { weight: 45, grams: 965 },
        { weight: 54, grams: 1115 },
      ],
      [
        { weight: 0.9, grams: 35 },
        { weight: 2.3, grams: 85 },
        { weight: 3.6, grams: 125 },
        { weight: 4.5, grams: 150 },
        { weight: 9.1, grams: 250 },
        { weight: 18, grams: 395 },
        { weight: 27, grams: 545 },
        { weight: 36, grams: 670 },
        { weight: 45, grams: 790 },
        { weight: 54, grams: 915 },
      ],
      [
        { weight: 0.9, grams: 35 },
        { weight: 2.3, grams: 65 },
        { weight: 3.6, grams: 100 },
        { weight: 4.5, grams: 110 },
        { weight: 9.1, grams: 200 },
        { weight: 18, grams: 320 },
        { weight: 27, grams: 430 },
        { weight: 36, grams: 545 },
        { weight: 45, grams: 645 },
        { weight: 54, grams: 745 },
      ],
    ],
    ageScopes: ['小于4个月', '4至9个月', '10至12个月'],
    ageIndex: 1,
    weight: null,
    food: {
      total: null,
      detail: {
        morning: {
          small: 0,
          large: 0,
        },
        noon: {
          small: 0,
          large: 0,
        },
        evening: {
          small: 0,
          large: 0,
        },
      },
    },
  },
  //事件处理函数
  onLoad: function () {
  },
  onAgeChange: function (e) {
    this.setData({
      ageIndex: e.detail.value
    });
    this.calFoodWeight();
  },
  weightInput: function (e) {
    this.setData({
      weight: e.detail.value,
    });
    this.calFoodWeight();
  },
  calFoodWeight: function () {
    const guide = this.data.guide[this.data.ageIndex];
    const weight = Number.parseFloat(this.data.weight);
    if (weight === 0) {
      this.setData({ 'food.total': 0 });
    } else if (!weight) {
      this.setData({ 'food.total': null });
    } else if (weight <= guide[0].weight) {
      this.setData({ 'food.total': guide[0].grams });
    } else if (weight >= guide[guide.length - 1].weight) {
      this.setData({ 'food.total': guide[guide.length - 1].grams });
    } else {
      for (let i = 1; i < guide.length; i += 1) {
        if (guide[i].weight > this.data.weight) {
          const preGrams = guide[i - 1].grams;
          const deltaGrams = guide[i].grams - preGrams;
          const deltaGuideWeight = guide[i].weight - guide[i - 1].weight;
          const deltaDogWeight = this.data.weight - guide[i - 1].weight;
          this.setData({
            'food.total': Math.round(preGrams + deltaGrams / deltaGuideWeight * deltaDogWeight),
          });
          break;
        }
      }
    }
    this.calFoodDetailWeight();
  },
  calFoodDetailWeight: function() {
    if (this.data.food.total === null) {
      return;
    }
    const noonValue = 0 / 9;
    const plan = [
      { key: 'morning', value: (1 - noonValue) / 2 },
      { key: 'noon', value: noonValue },
      { key: 'evening', value: (1 - noonValue) / 2 },
    ];
    plan.forEach(({ key, value }) => {
      const detailTotal = Math.round(this.data.food.total * value);
      const data = {};
      data[`food.detail.${key}.small`] = Math.round(detailTotal / 6);
      data[`food.detail.${key}.large`] = Math.round(detailTotal / 6 * 5);
      this.setData(data);
    });
  },
})
