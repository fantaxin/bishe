<template>
    <div class="Player">
        <input type="file" accept=".replay" ref="file" @change="handlerFiles()">
    </div>
</template>


<style scoped></style>

<script>
import { LogType, GameType } from '@/js/util/Constants';
import { Game } from '@/js/game/Game';

export default {
    name: 'PlayerP',
    data() {
        return {
            files: null,
        }
    },
    methods: {
        handlerFiles() {
            /**@type {File} */
            let file = this.$refs.file.files[0];
            let render = new FileReader();
            render.addEventListener("load", this.load)
            render.readAsText(file, "UTF-8");
        },
        load(event) {
            let data = event.target.result;
            let lines = this.toLines(data);
            let it = lines[Symbol.iterator]()
        },
        /**
         * @description: 
         * @param {Game} game
         * @param {string} line
         * @param {boolean} useLine
         * @param {IterableIterator<string>} it
         * @return {*}
         */
        parseFileHeader(game, line, it) {
            if (line === "") {
                line = it.next();
            } else if (line === undefined) {
                return;
            }

            let lineSplit = line.split(" ", 4);
            let logType = LogType.getLogType(lineSplit[0]);
            let logPathSplit = game.getLogPath().split("\\.");
            let fileLogType = LogType.getType(logPathSplit[logPathSplit.length - 1]);
            if (logType === LogType.UNKNOWN) {
                game.logType = fileLogType;
                game.gameType(GameType.TWO_D);
                game.setLogVersion(0);
                game.setOther("");
            }
        },
        /**
         * @description: 
         * @param {string} data
         * @return {Array<string>}
         */
        toLines(data) {
            let lines = data.split("\n");
            return lines;
        }
    }
}
</script>