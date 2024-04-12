def on_data_received():
    serial.write_line(serial.read_string())
    serial.write_number(1)
serial.on_data_received(serial.delimiters(Delimiters.NEW_LINE), on_data_received)

ESP8266_IoT.init_wifi(SerialPin.P8, SerialPin.P12, BaudRate.BAUD_RATE115200)
ESP8266_IoT.connect_wifi("Home_PP_2.4G", "Pn3346wi21")
if ESP8266_IoT.wifi_state(True):
    basic.show_icon(IconNames.HEART)
    basic.pause(2000)
    basic.clear_screen()
OLED.init(128, 64)

def on_forever():
    ESP8266_IoT.connect_thing_speak()
    ESP8266_IoT.set_data("1GOU4OMSYIU232TP",
        Environment.octopus_BME280(Environment.BME280_state.BME280_TEMPERATURE_C),
        Environment.read_soil_humidity(AnalogPin.P1),
        Environment.read_light_intensity(AnalogPin.P2),
        Environment.read_dust(DigitalPin.P13, AnalogPin.P3))
    ESP8266_IoT.upload_data()
    if ESP8266_IoT.thing_speak_state(True):
        basic.show_icon(IconNames.HEART)
        basic.pause(2000)
        basic.clear_screen()
basic.forever(on_forever)

def on_forever2():
    OLED.clear()
    OLED.write_string("temperature(C):")
    OLED.write_num(Environment.octopus_BME280(Environment.BME280_state.BME280_TEMPERATURE_C))
    OLED.new_line()
    OLED.write_string("soil moisture:")
    OLED.write_num(Environment.read_soil_humidity(AnalogPin.P1))
    OLED.new_line()
    OLED.write_string("light intensity:")
    OLED.write_num(Environment.read_light_intensity(AnalogPin.P2))
    OLED.new_line()
    OLED.write_string("DUST(ug/m3):")
    OLED.write_num(Environment.read_dust(DigitalPin.P13, AnalogPin.P3))
    basic.pause(6000)
basic.forever(on_forever2)
