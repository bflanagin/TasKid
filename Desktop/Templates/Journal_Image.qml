import QtQuick 2.11
import QtQuick.Controls 2.2
import "../theme"
import "../plugins"
import "../General"

import "../plugins/text.js" as Scrubber
import "../plugins/spellcheck.js" as Spelling

Item {
    id: thisWindow
    width: parent.width * 0.98
    height: parent.height * 0.98

    property string img1:""
    property string img2:""

    Timer {
        id:checker
        interval: 2000
        repeat: false
        running: true
        onTriggered: {
            var thestring = lessonNotes.getText(0,lessonNotes.length).replace(/<font color='red'>/g,"").replace(/<\/font>/g,"")
            lessonUpdate = lessonUpdate = img1+","+img2+","+Scrubber.replaceSpecials(thestring)
            lessonNotes.text = Spelling.checkspelling(thestring)
            lessonNotes.cursorPosition = lessonNotes.length
        }
    }



    ESborder {
        id:imgbox1
        anchors.left: parent.left
        anchors.top:parent.top
        width:parent.width * 0.24
        height:width

        Image {
            anchors.centerIn: parent
            source:"/icons/photo.svg"
            width:parent.width * 0.5
            height:parent.height * 0.5
        }


    }

    ESborder {
        id:imgbox2
        anchors.left: parent.left
        anchors.top:imgbox1.bottom
        anchors.topMargin: height * 0.1
        width:parent.width * 0.24
        height:width

        Image {
            anchors.centerIn: parent
            source:"/icons/photo.svg"
            width:parent.width * 0.5
            height:parent.height * 0.5
        }


    }


    ESborder {
        id:noteBlock
        anchors.right: parent.right
        width: parent.width * 0.75
        anchors.top: parent.top
        anchors.bottom: parent.bottom
        anchors.bottomMargin: parent.height * 0.1

        Text {
            id: title
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.margins: 10
            font.bold: true
            font.pointSize: 12
            text: qsTr("Journal Entry")
        }

        Rectangle {
            anchors.top: title.bottom
            width: parent.width * 0.98
            anchors.horizontalCenter: parent.horizontalCenter
            height: 3
            color: seperatorColor
        }

        ScrollView {
            id: noteScroll
            anchors.top: title.bottom
            anchors.topMargin: 10
            anchors.bottom: parent.bottom
            anchors.bottomMargin: parent.height * 0.05
            anchors.horizontalCenter: parent.horizontalCenter
            width: parent.width * 0.98

            background: ESTextField {
            }

            TextArea {
                id: lessonNotes
                width: noteBlock.width * 0.98
                height: noteBlock.height * 0.98
                wrapMode: Text.WordWrap
                selectByMouse: true
                textFormat: Text.RichText

                 Keys.onReleased: checker.restart()
            }
        }

        Text {
            anchors.top: noteScroll.bottom
            anchors.margins: 5
            anchors.right: noteScroll.right
            text: "Word count: " + (lessonNotes.text.split(" ").length - 1)
            visible: if ((lessonNotes.text.split(" ").length - 1) > 0) {
                         true
                     } else {
                         false
                     }
        }
    }
}
