<template>
  <div>

    <full-calendar :events="events" :config="config"></full-calendar>
  </div>
</template>
<script>
  import 'fullcalendar/dist/locale/zh-cn'
  export default {
    data () {
      return {
        events: [
          {
            title  : '事件1',
            start  : '2018-04-01',
          },
          {
            title  : '事件2',
            start  : '2018-04-05',
            end    : '2018-04-07',
          },
          {
            title  : '事件3',
            start  : '2018-04-17T12:30:00',
            allDay : false,
          },
        ],
        config:{
          locale: 'zh-cn',
        }
      }
    },
    methods : {

    }

  }
</script>

