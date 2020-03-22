# BK's CLI

## Installation

```bash
npm i -g bk-codetest-cli
```

## Usage

```bash
bk [command] -h
```

## Commands

#### touch
> create empty, change access or modification time

Usage

```bash
bk touch [option] <file1> <file2> <file3> ...
ex: bk touch file1.txt file2.txt file3.txt

bk -m touch <file1> <file2> <file3> ...
ex: bk touch -m file1.txt file2.txt file3.txt
```

### ls
> list directory contents

Usage

```bash
bk ls
```

### find
> find files

Usage

```bash
bk find [option] <starting directory> <matching criteria>
ex: bk find . '.txt'
ex: bk find bin/ '.js'
ex: bk find -name . '.txt'
ex: bk find . -name '.txt' -delete
```

### sed
> stream editor

Usage

```bash
bk sed <script> <input-file> [option]
ex: bk sed s/Bala/Balu/ file1.txt

bk sed -w <output-file> <script> <input-file>
ex: bk sed -w output.txt s/Balu/Bala/ file1.txt 

bk sed -n <script> <input-file>
ex: bk sed -n s/Balu/Bala/ file.txt

bk sed <script>
ex: bk sed s/Bala/Balu/ (allows to read online text and print, command + c to exit)
```

### mv
> move or rename files

Usage

```bash
bk mv [option] <source> <target>
ex: bk mv file1.txt file4.txt
ex: bk mv -i file1.txt file4.txt
```

## Linting
```bash
npm run lint
```