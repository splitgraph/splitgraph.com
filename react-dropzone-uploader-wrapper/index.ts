// Explanation for all this madness with `react-dropzone-uploader-wrapper`
//
// `react-dropzone-uploader`'s `types` point to a TypeScript file
// that is committed in `node_modules/react-dropzone-uploader/dist`.
// When TypeScript looks for the type declarations of `react-dropzone-uploader`,
// it encounters those TS files and tries to type-check them too, according to
// the `compilerOptions` of the project that is importing it.
//
// The `compilerOptions` used by `react-dropzone-uploader` are different from
// the ones our projects use, which means that type-checking the
// `react-dropzone-uploader` types (which are actually the source TS files of
// that library) results in errors.
//
// Normally, that is fine, because projects include declaration files (*.d.ts)
// instead of real source files for their types. Type-checking declaration files
// is usually skipped with `skipLibCheck: true` in `compilerOptions`.
// https://www.typescriptlang.org/tsconfig#skipLibCheck
// However, since those are not source files, the flag does not affect them and
// they are type-checked anyway.
//
// Using `exclude` in `tsconfig.json` will not exclude the files frorm
// type-checking, because that is not how `exclude` works. Citing
// https://www.typescriptlang.org/tsconfig#exclude:
// > A file specified by exclude can still become part of your codebase due to
// > an import statement in your code
//
// The solution we came up with is creating a new TS project (this one,
// `react-dropzone-uploaderreact-dropzone-uploader-wrapper`) whose sole purpose
// is re-exporting `react-dropzone-uploader` and including its source code.
// Specifying the TS files of `react-dropzone-uploader` as files of the TS
// project means that they are type-checked using the `compilerOptions` from
// this project's `tsconfig.json`'s `compilerOptions`. They are changed in a way
// that type-checking passes for this project.

export * from "react-dropzone-uploader";
export { default as Dropzone } from "react-dropzone-uploader";
//
// KKKK0OO0KKKKXXXKKXXXXXXXK0ko;.................'',;:lolcodxxxx0NWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// KKKK0O0KKKKKKXXXKKXXX0xoc;'............ ..............';cdxdxONWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
// KKKK00KKKKKKKXXXXKKKOl,........ .       ................';lox0XNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWWWWWWW
// KKKKKKKKKKKKXXXXKkdc,.........             .... ..........';oOKXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNWWW
// XXXKKKK000KKXK0ko;........                       ...........ckKXXXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNW
// XKKKKKKK00KKK0d;.....                                .......'o0KKKKXXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNNW
// KK0000KKK0KKOd;.. ..                   .     ................,d0KKKKKXXNNNNNNNNNNNNNNNNNNNNNNNNNNNNW
// K00000000K0Od;..  ..                 .......'',,,,;;:cllllc,..,d0000KKXXXNNNNNNNNNNNNNNNNNNNNNNNNNNW
// KKKKK000K00d,...                 ....',;;::::::::::ccclllool:,':x0000KKXXNNNNNNNNNNNNNNNNNNNNNNNNNNW
// KKKKKKKKK0kc....            ....',;;::cccccccccc:::ccccccllll:,'ck0O0KKKXXXNNNNNNXNNNNNNNNNNNNNNNNNW
// 000KKXXKK0d;...         ....',;:::cccccccccccccccccc:::::cccll:,;oO0000KKKXXNNNNNXXXNNNNNNNNNNNNNNNN
// 00KKKKKKKKk:. .    .....,,;::ccccccclllllllllllccccc:::::ccclllc:cdO0000KKXXXXXNNXXXXXXNNNNNNNNNNNNN
// KKKKKKKKKK0l.    ...',;:::::cccccllllllooooooolllcccccc::ccccllllclk0O000KXXXXXXXXXXXXXXXXNNNNNXXXNN
// 00KKKKKKKK0o... ...,:::::::cccccclllllooooooooooollllllcccccllllllldO00000KKXXNXXXXXXXXXXXNXXXNXXNNN
// O00KKKKKK0Oo......',;:::::::ccccllooooooooooddddddodddolc:;,,;::cclokOkOO00KKXXXXXXXXXXXXNNXXXNNNNXN
// OO000KKKKK0d,.....',;:::::::::cclooddddddddddxxxdddoolc;'...'',,,:clol:coxO0KKXXXXXXXXXXKd:;,,:ddc;;
// OOOO0KKKKKKkc.....',;;::::::::cloodddddddxdddxdolllc:,'..,;:c::;:::clc:;:cdO00KKXXXXXXXN0ooxd,  ,ldx
// 00000KKKKKK0x;...',,;::::::::cclooooooooodddddolcc::;,;;;,,''''',,;:ccc:::cxO000KKXXXXXXNNN0d'.:ONKk
// 0000KKKKKKKK0o,..',;;::::::::::::;;;;;::clllollc:;;,,,;:;..';;,;;::::ccc:;;oOO000KXXXXXXXNO; ,kKXKl.
// 000KKKKKKKKKKkc'.',;;::;:::;,'''''..',,;:::clolc:;,,',;cc::;;;:cclcccccc:::lkOO00KKXXXXXXNO:;xXXNKl'
// 0000KKKKKKKKK0d;.',;;::::;,,;:lllc;;;,,;;;:::cllc::;,,;;::::ccllolllccc::;;ckOOO00KXXXXXXXOc:kXXX0o:
// 0000KKKKKKKKKKOo,',:::::;;:ccc:;,'.,::;,,;::cllolcc:;;;::ccllooooooollcc;,,:xOOO00KXXXXXXXx,'oXXX0c.
// K0000KKKKKKKKXKkl,,;::::::::;,.',,,;;;,;:::cccclollc:;;;:ccloddddooollcc:,,:dOOO00KXXXXXXXXKKKXXXXXX
// KK0000KKKKKKKOxoc;,;;:::;;;;;;::::::::cccccc::clooollc:;;:::clloooolllccc;;cxOOOO0KKXXXXXXXXXXXXXXNN
// KK000K000KKK0o;;::;;;;;;;;;:cccccccclllllcc:::clooooolcccc::::ccllllcc::::cdkOOOO0KKXXXXXXXXXXXKXXXN
// KK000K000KKKOl;:clc;;;;;;;:cllooolllooollc::cclooddddoc::;;;;::::cc::::;:oxkOOOOO0KKXXXXXXXXXXXKXXXN
// KK00KKK00KKK0d::ccc:;:;;;::clooodddddolccccllllccllllc;,',,;;;;:::::::::cdOkkOOOO0KKXXXXXXXXXXXKXXXN
// KKKKKKK00KKKKkollccllc:;;:cclloddxxxolclolllc:;;;::::;,'''',,;;,,;;:::cccokkOOkO00KKXXXXXXXXXXXKXXXN
// KKKKKKKKKKKKK0Odllllllc:;:cccllooodolcclooollc::;;;;;;;;;;;;;;,'',::::cccdkOOkOOO00KKXXXXXXXXXKKXXXX
// KKKKKKKKXXKKKKKOdl:cllc:;:::::ccllllccclllcc:::;:ccccc:::::clc;'',:::::ccdkOOkkOO0KKXXXXXXXXXXKKKXXX
// KKKKKKKKKKKKXKKKOdc::::::::::::::cc::cc:::;;;::cccccclcldxxkkxl;,,::::::lxOkOOOOO0KKXXXXXXXXXKKKKXXX
// 0KKKKKKKKKKXKKKKKOxolccc::::;::::::::;;,,,;::cclloodxOO0KKK0koc;;;:::;;:okOkOOOO00KKXXXXXXXXXKKKKXXX
// 00K00KKKKKKKKKKKKK00Oxxdddoc;:::::::;;,''':oxkOOOO00KKK0Okdolc:::::::;:cdOOkOOOO0KKXXKKKXXXKKKKKKXXX
// ,lOK0KKKKKKKKKKKKKKKK00000ko::::::::::;;;;:ldxkkkkxxxxxdollcccc:::;:::;;lkOkkOOO0KKKKKKKKKKKKKKKKXXX
//  .o0KKKKKKKKKKKKKKKKKKK00Okdl::cc:::::::::::::cccccclloollllc:::::;::;,,cxOOkOOO0KKKKKKKKKKKKKKKKXXX
//  ;k00KKKKKKKKKKKKKKKKKKXK0O0xc::::::::::ccccc:::ccllloollc::;;;::;:::;,':okOkkkO00KKKKKKKKKKKK00KXXX
// oO00KKKKKKKKKKKKKKKKXXXXK0KKOdc;;:::::::cccccccc:ccc::::;;;;;;::::::;,'',:oxkkkkkO00KKKKKKKKK000KXXX
// O00KKKKKKKXXXXXKKKKKXXXKKKKKKko:;;;;;:::::cccccccccc::::;;:::c::;::;'.'',,;coxxkkkOOO00000000000KKKK
// 000KKKKKKXXXXXKKKKKKKKKKKKKKX0xl:;;;;;;;;:::cccccccccccccccccc:::;;'..''''',;cldxkOOkkkkOOOOOOO0KKKK
// 00KKKKKKXXXXKKK000000KKKKKKKXK0xc:;;;;;;;;;:::cccccccllllllccc:::;...''''''''',cx0KK0OOkkkxxkkkO0KKK
// kO00KKXXKXXKK00OOO00000OOOOO0KKOo::;;;;;;;;;;::::::cccllllccc:;;,....''''''''';o0XXXXXK0OkkxxxxkO000
// xxkO0KKKKKKK00OOOO0000OOkxddxxkxoc::::;;;,,;;;;,,,,;;;:::::;;,'......'',,'''';d0XNXXXXXKK00OkkkkkOOO
// OO000KKKKKKKKK00K0000000Okxxxxxdolcc:c::;;,,,,,''..................''',,,,,,;dKNNNXXXXXXXXXKK0000OOO
// 0000000KKKKKKKKKKKKKKKK00000000Okxdlcclc::;;;;;;,...............',,,,,,,,;;cxKNNNXXXXXXXXXXXXKKKKK00
// kkkkOOOOOO0000000000KKKKKKKKKKKK00Odcclcccc:::::;,,'......'',;;;:::;;;;;;:oOXNXNXXXXXXXXXXXXXXXXXXKK
// ccccclllllloooodddddxxxxkkkkkOOOOOkdlcclllccccc:::;;;,,,,;;:ccc:cccc::::lx0NNNNXXXXXXXKKKKKKKKKKKXXX
// ;;;;;;;;;;;;;:::::::ccccccccccccldxkdccllllcccccc:::::cccccccllllllcccox0XNNXXXXXXXXXKKKKKKKKKKKKKKK
// ccc::::::::::::::::::::::::::::cdOK0x::ccllllcccccllllllcclllllllllodkKXNNXXXXXXXXXKKKKKKKKKKKKKKKKK
// kkxxxxxxxxddddddddoooooolllllldk0KXKd:::cllllllllloooollllllllloodk0KXNNXXXXXXXXXKKKKKKKKKKKKKKKKKKK
// 000000000000000000OOOOOOOkkkkO0KKXXKxc::cllllllloooooollllllllodk0XNNNNXXXXXXXXXXKKKKKKKKKKKKKKKKKKK
// Credits to https://www.ascii-art-generator.org/
