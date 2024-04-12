ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
ESP8266_IoT.connectWifi("wichphome_2G", "Mi3246pm!")
if (ESP8266_IoT.wifiState(true)) {
    basic.showIcon(IconNames.Heart)
    basic.pause(2000)
    basic.clearScreen()
}
OLED.init(128, 64)
loops.everyInterval(60000, function () {
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.setData(
    "1GOU4OMSYIU232TP",
    Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
    Environment.ReadSoilHumidity(AnalogPin.P1),
    Environment.ReadLightIntensity(AnalogPin.P2),
    Environment.ReadDust(DigitalPin.P13, AnalogPin.P3),
    pins.analogReadPin(AnalogPin.P4),
    pins.analogReadPin(AnalogPin.P10)
    )
    ESP8266_IoT.uploadData()
    if (ESP8266_IoT.thingSpeakState(true)) {
        basic.showIcon(IconNames.Happy)
        basic.pause(2000)
        basic.clearScreen()
    }
})
basic.forever(function () {
	
})
basic.forever(function () {
    OLED.clear()
    OLED.writeString("temperature(C):")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.newLine()
    OLED.writeString("soil moisture:")
    OLED.writeNum(Environment.ReadSoilHumidity(AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("light intensity:")
    OLED.writeNum(Environment.ReadLightIntensity(AnalogPin.P2))
    OLED.newLine()
    OLED.writeString("DUST(ug/m3):")
    OLED.writeNum(Environment.ReadDust(DigitalPin.P13, AnalogPin.P3))
    OLED.newLine()
    OLED.writeString("LDR_OUT:")
    OLED.writeNum(pins.analogReadPin(AnalogPin.P4))
    OLED.newLine()
    OLED.writeString("LDR_IN:")
    OLED.writeNum(pins.analogReadPin(AnalogPin.P10))
    basic.pause(6000)
})
