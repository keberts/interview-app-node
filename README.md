# Interview Service

A command-line app to aggregate and sort interview results.
The data will be normalized as EDN and printed to stdout.

## Execution

To invoke the command line app, start it as follows:

```bash
node ./src/index.js <SORT_TYPE> <FILE_ONE> <FILE_TWO> ... <FILE_N>
```

For example:

```bash
node ./src/index.js birthday ./resources/2021-01-12.txt ./resources/2020-12-20.txt
```

Sorts are always performed in ascending order, and must be one of the following strings:

- id
- birthday
- name

All files must be specified relative to the active directory, and the app expects them to be formatted in a specific way.
Each line within the file must be a unique interview record.
Fields are separated by spaces, and must be in the following order:

- id : A unique integer representing the candidate's ID
- family-name : A string
- given-name : A string
- email : A string representing a valid email address
- birthday : A `yyyy-mm-dd` formatted string representing the candidate's birthday
- result : A string exactly matching `PASSED` or `FAILED`
