# CSV to JSON Utility
A utility project for converting client provided CSV data to a JSON object used in an application.

[Demo](https://jamesrwilliams.github.io/csv-to-json-utility/)

## Background

For recent project I was required to populate an angular application's select box that uses primary and secondary levels. You first select an option from the primary drop down and then an associated secondary drop down is populated with related sub-sections. We are provided a CSV of options that follow a format similar to this:

|1st Key| 1st Title| 2nd Key | 2nd Key |
|---|---|---|---|
|A|Fruit|A|Apples|
|A|Fruit|B|Bananas|
|B|Vegetables|A|Asparagus|
|B|Vegetables|B|Broccoli|

When the user selected "Fruit" the second drop down would populate with "Apples" and "Bananas". The idea being that we then transmute this into a more JSON like format for use in javascript applications:
```
[
  {
    "label": "Fruit",
    "code": "A",
    "options": [
      {
        "label": "Apples",
        "code": "A"
      },
      {
        "label": "Bananas",
        "code": "B"
      }
    ]
  },
  {
    "label": "Vegetables",
    "code": "B",
    "options": [
      {
        "label": "Asparagus",
        "code": "A"
      },
      {
        "label": "Broccoli",
        "code": "B"
      }
    ]
  }
]
```

