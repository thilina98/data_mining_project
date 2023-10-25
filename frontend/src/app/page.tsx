"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

import SearchBar from "@/components/searchBar";
import FilterCard from "@/components/filterCard";
import { Author, Poem, PoemName, Year, returnContent } from "@/utils/poem.type";
import PoemsCardContainer from "@/components/poemsCardContainer";
import {
  getAllPoemNames,
  getAllPoems,
  getAllPoetsNames,
  getAllYears,
  getAuthors,
  getPoemBySearch,
  getPoemNames,
  getYears,
} from "@/utils/apiService";



export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [serchResults, setSearchResults] = useState<Poem[][]>([]); // [{}
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);
  const [selectedYears, setSelectedYears] = useState<Year[]>([]);
  const [selectedPoems, setSelectedPoems] = useState<PoemName[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [years, setYears] = useState<Year[]>([]);
  const [poemNames, setPoemNames] = useState<PoemName[]>([]);
  const [previewResults, setPreviewResults] = useState<Poem[][]>([]);

  //       poem_id: 0,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "හත් වසරක්ම තබමින් උණ පුරුකෙ දමා",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 1,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ගත්තත් ඔබ වළග තුබු ඇද එලෙස තමා",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 2,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ඇත්තෙය කියමනක් මිනිසා වෙතට යොමා",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 3,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තත් ඔය නුඹගෙ එයිනුත් ඇත ඉහළ දමා",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 4,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සැරද මමිතුරු සඳ, සිය ගති නොහල කිසිදා ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "සැරද මමිතුරු සඳ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 5,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "කළගුණය සැලකුම, අතින් සැමටම ගුරු ව",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 6,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පැහැ රුව වගේ යයි හරියට බැබිල ගහේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 7,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සැහැ සිව ඔබට ඇතමුන් දොස් නගනු ඇහේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 8,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "බැහැ රව නොගොස් අප අතරම රැදුන මෙහේ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 9,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නැහැ ඔබ වැරදි ගැහු මඩ ගැහු අයට ගැහෙ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 10,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "කුවේනි මුණ ගස් වන්නට අත නෑර ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "කුවේනි මුණ ගස් වන්නට",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 11,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "එවේලෙහි විජය හට පෙන්නුවෙ පාර ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: " විජය හට පෙන්නුවෙ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 12,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ලොවේ එදා ඔබ කුළ එකියක සූර ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 13,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නැවේ මගේ හිස පෑ මට උප කාර",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 14,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පිදුරු ගොඩේ ලැග අනුනගෙ ඉදුල කන ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 15,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මිතුරු නුඹය සිය කුළ දම් නොකෙල සන ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 16,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මැදුරු තුළ වෙසෙන සිය ගති නොහදුන න ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 17,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මහරු වෙසැති බල්ලන්ගෙන් පල ද මොන ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "මහරු වෙසැති බල්ලන්ගෙන් ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 18,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පිදුරු ගොඩක සිටි ඔබ නෑයෙක් පොරණ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 19,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ගොදුරු සොයා ආ ගොනෙකුට විය උරණ ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "ගොදුරු සොයා ආ ගොනෙකුට",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 20,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "අඳුරු ලපයකය් එය හිම් කොට දෙරණ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "අඳුරු ලපයකය් එය ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 21,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "එදුරු වන්න මෙගමන වේ පිළි සරණ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 22,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "අයුත් තියට අල්ලන ලද විලක් කූ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: " අල්ලන ලද විලක් කූ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 23,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "කොහෙත් තම දියුනුවක මං නොදැක් කූ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 24,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තවත් අයෙක් බී ගෙන හැළි අරක් කූ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 25,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "බිනිත් මුසා තැන තැන වී පරක් ක",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 26,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පවට බියක් නැත සදහන් මග වැසි යෝ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 27,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නිවට කම් වලින් දෙලොවම පල නැසි යෝ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 28,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "කපටි සිනාවෙන් අඩු නැති ගම් වැසි යෝ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 29,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පිනට බඩ වඩන්නට අන්තිම රුසි යෝ ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: " අන්තිම රුසි යෝ ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 30,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ලෙඩට බේත් සහ නිදහස් ඉගනී ම",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 31,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පිනට ලැබේ පාසල් පොත නොමිලේ ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 32,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "රටට කප්රුකකි ජනසවි බිහි වී ම ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "රටට කප්රුකකි",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 33,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මුනට එහෙත් ඇස් අරුනේ නැත තා ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 34,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සමන සුරගුරුට සත දැනුම ඉහළම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 35,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සමග දහම් ගුණයෙන් හෙබි අසම ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 36,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සුමන ජෝති නා සමිදුන් ජනිත බිම ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "සුමන ජෝති නා සමිදුන් ජනිත",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 37,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ගමන පෙර මගෙහි ඇත පිය මිතුරු තුම",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 38,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "හුරතල් පාන කිරිකැටි මල් හිනාවේ ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "කිරිකැටි මල් හිනාවේ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 39,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නෑනේ නුඹට මුතු දෙපටකි ගෙනාවේ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 40,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "යන්නට පොසොන් පෝයට වන්දනාවේ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 41,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තියෙනව නේද එහෙමත් කල්පනාවේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 42,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පවර තගු මහල් දැකුමට හිත කරය ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 43,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නිතර රැය දවල් මහසෙන් එක යුරය ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: " මහසෙන් එක යුරය",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 44,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සතිර සැප සියල් ලෙන් එක ලෙස බරය ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 45,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මිතුර බලළකල් තංගලූ පුර වරය",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 46,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ලංගම පුද්ගලික යන හැම බසයක්ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 47,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ටිං වල මා ඇහිරුව විලසය දැක්ම ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "ටිං වල මා ඇහිරුව විලසය",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 48,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ළං විය නොහැක වුවමුත් වේ ගැහැටක්ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 49,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තංගලූ සිරිබලා පා ගමණින් නකි ම",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 50,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ලංගම පුද්ගලික යන හැම බසය ක්ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 51,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ටිං වල මාˆ ඇහිරුව විලසය දැක්ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 52,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ළං විය නොහැක වුවමුත් වේ ගැහැටක්ම ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 53,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තංගලූ සිරිබලා පා ගමණින් නකි ම",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 54,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "විහිද පැතිර ගිය සුදුවැලි තලා මත ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "සුදුවැලි තලා මත ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 55,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නොමද මලාමැලි රොනවුල් වෙලා ඇත ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 56,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "විවිද විහග කැළ පිඹිනා නලා යුත ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 57,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පැහැද කහද මෝදර ගම බලා සිත ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 58,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "බඩ ඉරිගු පැණි පුහුල් විකුණාය තැන තැනේ ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "බඩ ඉරිගු පැණි පුහුල් විකුණාය තැන",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 59,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ගොඩ වල්ය තව සීනි කැකිරි රත්පැහැ ගෙනේ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 60,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "වඩයි සිත ලොබ තගේ වැව් මාˆ දුටු සැනේ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 61,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "කඩ මණ්ඩියෙන් රන්නෙයා ගන්න සබදිනෙ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 62,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මීපිඩ සුරය වන් කිවි දිවි සැමරූ මට",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 63,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ලෝකඩ වලින් නිමවූ ඇගෙ පිළිරු වට ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "ලෝකඩ වලින් නිමවූ ඇගෙ පිළිරු වට ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 64,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පාඅඩ දැණිව බුහුමන් සිත් බැතිනි තුට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 65,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "යාකඩ නමින් නෝනයි ගම ද පසු කොට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 66,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සක ගෙල බැඳුණු මුතුවැල් නිබද දිදුල න ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "මුතුවැල් නිබද දිදුල න ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 67,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ටික ටික පීන පියවුරු උකුˆ සලමි න ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 68,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "දැක කˆ දොදොල් විකුණන රුසිරු වරග න ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 69,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "උකටලී සිතේ දුරලනු සබද සසොබ න ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 70,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තැන තැන තැඹිලි වෑවර වලූ ගොඩ වල්ය ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 71,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "විකුණන කොමළදුන් නෙත්සැර ඉදු නිල්ය",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 72,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "යනඑන අයට දෙන හසරැලි මදු මල්ය ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 73,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නැලවෙන පුලූ කු තල මල් ඕවිල්ය",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "පුලූ කු තල මල් ඕවිල්ය",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 74,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "බාසුර දිගා කරමින් දිගු කිරණ සොඩ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 75,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "නිහර උරණ අතරේ තණ පළස උඩ ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 76,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "සූකර ගනේ දැක නොබියව තලන මඩ ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "සූකර ගනේ දැක නොබියව තලන මඩ ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 77,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "යාකර ගනන් ලේවායෙන් පිණිස වැඩ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 78,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "තඹර මීන කුදුවිලූ යුතු සතර වට ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "තඹර මීන කුදුවිලූ ",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 79,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "ගැඹර සතර දෙන විදුහල ඉදිරි පිට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 80,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "අඹර තෙක් මනැගි හෝරා කුˆණ දුට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 81,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "දෙබර වැව පෙනෙයි දුර සිට මිතුර තට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 82,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "අවර අඹර හල උළෙලෙහි දිනින් දුට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 83,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "පවර නවු ර සැණකෙළි වෙස් දෙවින් තුට",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "සැණකෙළි වෙස් දෙවින් තුට",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 84,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මෙවර නොහැර නැගු විදුලිය පහන් වට ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //     {
  //       poem_id: 85,
  //       poem_name: "සුවන සදෙස",
  //       poet: "දෙනගම කාලසිංහ",
  //       line: "මිතුර කතර ගම් පුරයට ගොසින් සිට",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2019,
  //     },
  //   ],
  //   [
  //     {
  //       poem_id: 174,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "රන්මුතු වල්ලියා මා තැන තැන ඇද්ද",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "රන්මුතු වල්ලියා",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 175,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "වෙන් කර මගෙන් ගෙන ගිය ඇය කොහී වෙද්ද",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 176,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "ගම් මණ්ඩියේ කවුරුත් එය නො දනිද්ද",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 177,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "දැන්වත් මහාද තරක පින පව හදුනද්ද?",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 178,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "අගුවෙන් කොනක මා හින්දා හෙවන රැදේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 179,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "ළමයින් උයන 'වැලිබන්' නිරතුරුව ඉදේ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "'වැලිබන්'",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 180,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "පියමං කළ යුගය සිහි වී හිතට රිදේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 181,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "මතු පිට මගේ බර තුලනය කර රන්දා",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "මතු පිට මගේ බර",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 182,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "මුතු වල්ලියට' මාවක පෙන්නුව උන්දා",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 183,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "ගෙතුලිත් ඇදන්නට වාරුව නැති හින්දා",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 184,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "යුතුකම් නොකර මා කොන් කෙරුවද මන්දා ?",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 185,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "තෙක් වාහන වලිනි ගම නගරයක් කළේ",
  //       metaphor_present_or_not: "Yes",
  //       count_of_the_metaphor: 1,
  //       metaphorical_terms: "තෙක් වාහන",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 186,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "මොකටද ආදි කාලේ තිබු තිරික් කලේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 187,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "එක එක ඇනුම් පද කවුරුක් මනක් කළේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //     {
  //       poem_id: 188,
  //       poem_name: "තිරික්කලේ වැලි පීල්ල",
  //       poet: "ජයසිරි  රුවන් පතිරණ",
  //       line: "සැකයකි, ඒක හින්දද මා අහක් කළේ",
  //       metaphor_present_or_not: "No",
  //       count_of_the_metaphor: 0,
  //       metaphorical_terms: "unknown",
  //       year: 2003,
  //     },
  //   ],
  // ]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterClick = () => {
    console.log("selectedAuthors", selectedAuthors);
    console.log("selectedPoems", selectedPoems);
    console.log("selectedYears", selectedYears);

    let filteredResults = [...serchResults];

    let tempAuthorsList = selectedAuthors.map((author) => author.name);
    let tempPoemList = selectedPoems.map((poem) => poem.title);
    let tempYearsList = selectedYears.map((year) => year.year);

    if (tempAuthorsList.length > 0) {
      filteredResults = filteredResults.filter((result) =>
        tempAuthorsList.includes(result[0].poet)
      );
    }

    if (selectedPoems.length > 0) {
      filteredResults = filteredResults.filter((result) =>
        tempPoemList.includes(result[0].poem_name)
      );
    }

    if (selectedYears.length > 0) {
      filteredResults = filteredResults.filter((result) =>
        tempYearsList.includes(result[0].year.toString())
      );
    }

    setPreviewResults(filteredResults);
  };

  const handleSearch = async () => {
    if (searchTerm === "") {
      getPoems();
      getAllAuthors();
      getAllYearsList();
      getAllPoemNamesList();
    } else {
      try {
        const result = await getPoemBySearch(searchTerm);
        setSearchResults(result);
        setPreviewResults(result);
        getAuthorsList(searchTerm);
        getYearsList(searchTerm);
        getPoemNamesList(searchTerm);
      } catch (err) {
        setSearchResults([]);
        console.log(err);
      }
    }
  };

  const getPoems = async () => {
    try {
      const response = await getAllPoems();
      setSearchResults(response);
      setPreviewResults(response);
    } catch (err) {
      setSearchResults([]);
      console.log(err);
    }
  };

  const setAuthorsToList = (responseList: returnContent[]) => {
    const tempAuthors = responseList.map((item) => {
      return { name: item.key };
    });
    setAuthors(tempAuthors);
  };

  const setYearsToList = (responseList: returnContent[]) => {
    const tempYears = responseList.map((item) => {
      return { year: item.key };
    });
    setYears(tempYears);
  };

  const setPoemNamesToList = (responseList: returnContent[]) => {
    const tempPoemNames = responseList.map((item) => {
      return { title: item.key };
    });
    setPoemNames(tempPoemNames);
  };

  const getAllAuthors = async () => {
    try {
      const response = await getAllPoetsNames();
      setAuthorsToList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllYearsList = async () => {
    try {
      const response = await getAllYears();
      setYearsToList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPoemNamesList = async () => {
    try {
      const response = await getAllPoemNames();
      setPoemNamesToList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getAuthorsList = async (text: string) => {
    try {
      const response = await getAuthors(text);
      setAuthorsToList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getYearsList = async (text: string) => {
    try {
      const response = await getYears(text);
      setYearsToList(response);
    } catch (err) {
      console.log(err);
    }
  };

  const getPoemNamesList = async (text: string) => {
    try {
      const response = await getPoemNames(text);
      setPoemNamesToList(response);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPoems();
    getAllAuthors();
    getAllYearsList();
    getAllPoemNamesList();
  }, []);

  return (
    <div>

      <Navbar />

      <SearchBar
        handleInput={handleInput}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
          <FilterCard
            selectedAuthors={selectedAuthors}
            selectedPoems={selectedPoems}
            selectedYears={selectedYears}
            authors={authors}
            poemNames={poemNames}
            years={years}
            setSelectedAuthors={setSelectedAuthors}
            setSelectedPoems={setSelectedPoems}
            setSelectedYears={setSelectedYears}
            handleFilterClick={handleFilterClick}
          />
          <PoemsCardContainer poems={previewResults} />
      
    </div>
  );
}
