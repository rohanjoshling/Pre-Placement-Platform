// src/constants/editorTemplates.js

export const LANGUAGES = [
  { label: "C++", value: "cpp" },
  { label: "JavaScript", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "Python", value: "python" },
  { label: "Java", value: "java" },
  { label: "C#", value: "csharp" },
  { label: "JSON", value: "json" },
  { label: "HTML", value: "html" },
  { label: "CSS", value: "css" },
  { label: "Go", value: "go" },
  { label: "Ruby", value: "ruby" },
  { label: "PHP", value: "php" },
  { label: "Swift", value: "swift" },
  { label: "Kotlin", value: "kotlin" },
];

export const TEMPLATES = {
  cpp: `#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,

  javascript: `function solve() {
  
}`,

  typescript: `function solve(): void {
  
}`,

  python: `def solve():
    pass`,

  java: `class Solution {
    public static void main(String[] args) {
    }
}`,

  csharp: `using System;

class Program {
    static void Main() {

    }
}`,

  json: `{
  
}`,

  html: `<!DOCTYPE html>
<html>
  <body>
    <!-- HTML here -->
  </body>
</html>`,

  css: `/* CSS here */`,

  go: `package main

import "fmt"

func main() {

}`,

  ruby: `def solve

end`,

  php: `<?php

?>`,

  swift: `import Foundation

func solve() {

}`,

  kotlin: `fun main() {

}`,
};