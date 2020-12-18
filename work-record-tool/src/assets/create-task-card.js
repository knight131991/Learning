require("jquery");
require("bootstrap/js/dist/collapse");
const MyDate = require("../assets/time-handler");

module.exports = taskCardCreator = ({ title, timeList, description, id }) => `
  <div class="card card-margin">
    <div class="card-header">${title}</div>
    <div class="card-body">
      <h6>日期 : ${MyDate.getFormatedDate(timeList[0].start)}</n6>
      ${description ? `<h6>描述 : ${description}</n6>` : ""}
      <h6>進行時間 : ${new MyDate(
        timeList[0].start,
        timeList[timeList.length - 1].end
      ).getFormatedDuration(true)}</n6>
      <br/>
      <button
        type="button"
        class="btn btn-info t-b-margin"
        data-toggle="collapse"
        data-target="#demo${id}"
      >
        顯示詳細工作時間
      </button>
      <div id="demo${id}" class="collapse">
        <ul class="list-group">
          ${timeList.reduce((pre, { start, end }) => {
            return pre.concat(
              `
              <li class="list-group-item">
              <div class="d-flex justify-content-between">
              <span>${MyDate.getFormatedTime(start, true)}</span>
              <span>${MyDate.getFormatedTime(end, true)}</span>
              <span>${new MyDate(start, end).getFormatedDuration(true)}</span>
              </div></li>
              `
            );
          }, "")}
        </ul>
      </div>
    </div>
  </div>
`;
