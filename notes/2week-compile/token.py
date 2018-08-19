
class Token:
    EOF = {}
    EOL = "\\n"

    def __init__(self,line):
        self.lineNumber = line

    def getLineNumber(self):return self.lineNumber
    def isIdentifier(self):return False
    def isNumber(self):return False
    def isString(self):return False
    def getNumber(self):raise Exception("is not number!")
    def getText(self):return ""
