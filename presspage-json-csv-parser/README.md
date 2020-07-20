# JSON-CSV-PARSER

Parses [PressPage](https://www.presspage.com/) JSON into a CSV file. Please note this parser ignores images and just uses the following top-level properties: `title`, `subtitle`, `date`, and `url`.

## Usage

1. In the `data` directory add your JSON backup file.
2. Change the `filename` variable on line 3 of the app.js file to your filename.
3. Run `node app.js`
4. Output CSV can be found in the `output` directory.

## Sample Data

```
[...]
{
        "images": {
            "157": "abc.jpg",
            "500": "def.jpg",
            "800": "ghi.jpg"
        },
        "title": "Foo Bar and the corge of waldo",
        "subtitle": "Garply thud",
        "boilerplate": {
            "text": ""
        },
        "date": "2019-10-01 00:00:00",
        "url": "https://example.com"
        "message": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
}
[...]
```
