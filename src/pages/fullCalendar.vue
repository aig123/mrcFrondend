<template>
  <div style="width: 100%">
    <!--<full-calendar :events="events" :config="config" v-if="true"></full-calendar>-->
    <div class="section">
      <div v-for="(list, listName) in lists3" style="width: 8.3%;float: left;font-size: 7px">
          <div >
            <h3>{{list.name}}</h3>
          </div>
          <div >
              <div v-for="(item, index) in list.data" :key="index" style="border: 1px solid #82848a;width: 100px;overflow: hidden">
                 <div class="item"> {{item.week}}</div>
                <drop @drop="handleDrop(item, ...arguments)" class="event"> <drag :transfer-data="item" class="dragItem"> {{item.event}}</drag> </drop>
              </div>
          </div>
      </div>

    </div>
    <div v-for="(list, i) in lists" :key="i">
      <drop class="drop list" @drop="handleDrop2(list, ...arguments)">
        <drag v-for="item in list"
              class="drag"
              :key="item"
              :class="{ [item]: true }"
              :transfer-data="{ item, list, example: 'lists' }">
          {{ item }}
        </drag>
      </drop>
    </div>
  </div>
</template>
<script>
  import 'fullcalendar/dist/locale/zh-cn'
  export default {
    data () {
      return {
        events: [
          {
            title: '事件1',
            start: '2018-04-01',
          },
          {
            title: '事件2',
            start: '2018-04-05',
            end: '2018-04-07',
          },
          {
            title: '事件3',
            start: '2018-04-17T12:30:00',
            allDay: false,
          },
        ],
        config: {
          locale: 'zh-cn',
        },
        lists3: [
          {name: "一月", data: [{week: "星期一", event: "事一"}, {week: "星期二", event: ""}]},
          {name: "2月", data: [{week: "星期一2",event: ""}, {week: "星期二2",event: ""}]},
          {name: "3月", data: [{week: "星期一", event: "事一"}, {week: "星期二", event: ""}]},
          {name: "4月", data: [{week: "星期一2",event: ""}, {week: "星期二2",event: ""}]},
          {name: "5月", data: [{week: "星期一", event: "事一"}, {week: "星期二", event: ""}]},
          {name: "6月", data: [{week: "星期一2",event: ""}, {week: "星期二2",event: ""}]},
          {name: "7月", data: [{week: "星期一", event: "事一"}, {week: "星期二", event: ""}]},
          {name: "8月", data: [{week: "星期一2",event: ""}, {week: "星期二2",event: ""}]},
          {name: "9月", data: [{week: "星期一", event: "事一"}, {week: "星期二", event: ""}]},
          {name: "10月", data: [{week: "星期一2",event: ""}, {week: "星期二2",event: ""}]},
          {name: "11月", data: [{week: "星期一", event: "事一"}, {week: "星期二", event: ""}]},
          {name: "12月", data: [{week: "星期一2",event: ""}, {week: "星期二2",event: ""}]},
        ],
        lists: [
          ['A', 'B', 'C'],
          ['D', 'E', 'F'],
        ],
      }
    },
    methods : {
      handleDrop(toList, data) {
        const fromData = data;
          if (fromData) {
            toList.event=data.event;
            data.event=""
          }
      },
      // handleDrop(toList, data) {
      //   const fromList = data.list;
      //   if (fromList) {
      //     toList.push(data.item);
      //     fromList.splice(fromList.indexOf(data.item), 1);
      //     toList.sort((a, b) => a > b);
      //   }
      // },
      handleDrop2(toList, data) {
        const fromList = data.list;
        if (fromList) {
          toList.push(data.item);
          fromList.splice(fromList.indexOf(data.item), 1);
          toList.sort((a, b) => a > b);
        }
      },
    }

  }
</script>
<style scoped>
  .section {
    margin-top: 30px;
    margin-bottom: 50px;
  }
  .event{
    width: 40px;

    float: left;
    height: 20px;
  }
  .dragItem{
    background: #0d99e9;
  }
  .item{
    width: 50px;
    background: #e91b24;
    float: left;
  }
</style>
<style scoped>
  .drag {
    display: inline-block;
  }
  .drag.A { background: #aaa; }
  .drag.B { background: #888; }
  .drag.C { background: #666; }
  .drag.D { background: #444; }
  .drag.E { background: #222; }
  .drag.F { background: #000; }
  .drop {
    display: inline-block;
    vertical-align: top;
    padding: 15px;
    margin-bottom: 20px;
    width: auto;
    height: auto;
  }
</style>
<style>
  html {
    font-family: 'Arial', sans-serif;
  }

  body {
    /*padding: 40px 90px;*/
    line-height: 1.5;
  }

  .section {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  .drag, .drop {
    box-sizing: border-box;
    display: inline-block;
    border-radius: 10px;
    width: 100px;
    height: 100px;
    background: #ccc;
    vertical-align: middle;
    margin-right: 20px;
    position: relative;
    padding: 5px;
    padding-top: 35px;
    text-align: center;
    margin: 3px;
  }

  .drag {
    color: #fff;
    cursor: move;
    background: #777;
    border-right: 2px solid #666;
    border-bottom: 2px solid #666;
  }

  .drop {
    background: #eee;
    border-top: 2px solid #ccc;
    border-left: 2px solid #ddd;
  }
</style>

