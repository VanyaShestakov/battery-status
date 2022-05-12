
const chargingIcon = document.querySelector(".charging_icon");
const batteryLevel = document.querySelector(".battery_level");
const chargingBar = document.querySelector(".charging_bar");
const dischargingTime = document.querySelector(".discharging_time");
const otherInfo = document.querySelector(".other_info");

navigator.getBattery().then((battery) => {
  function updateAllBatteryInfo() {
    updateChargeInfo();
    updateLevelInfo();
    updateDischargingInfo();
  }

  updateAllBatteryInfo();

  battery.addEventListener("chargingchange", function () {
    updateAllBatteryInfo();
  });

  battery.addEventListener("levelchange", function () {
    updateAllBatteryInfo();
  });

  battery.addEventListener("dischargingtimechange", function () {
    updateAllBatteryInfo();
  });

  function updateLevelInfo() {
    batteryLevel.textContent = `${parseInt(battery.level * 100)}%`;
    chargingBar.style.width = `${parseInt(battery.level * 100)}%`;
  }

  function updateChargeInfo() {

    battery.charging
      ? ((chargingBar.style.animationIterationCount = "infinite"),
        (chargingIcon.style.display = "inline-flex"),
        (otherInfo.style.display = "none"))
      : ((chargingIcon.style.display = "none"),
        (otherInfo.style.display = "inline-flex"),
        (chargingBar.style.animationIterationCount = "initial"));
  }

  function updateDischargingInfo() {
    const dischargeTime = parseInt(battery.dischargingTime / 60) ? true : false;
    dischargeTime
      ? ((dischargingTime.textContent = `${parseInt(
          battery.dischargingTime / 60
        )} minutes`),
        (otherInfo.style.display = "flex"))
      : (otherInfo.style.display = "none");
  }
});