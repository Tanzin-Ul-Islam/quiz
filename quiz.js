import React, { useEffect, useState } from 'react'

export default function Test() {
    const arr1 = [{ id: 1, question: "abc", ans: "" }, { id: 2, question: "abd", ans: "" }, { id: 3, question: "abe", ans: "" }, { id: 4, question: "abf", ans: "" }];
    const [arr2, setArr2] = useState([]);
    const [ans, setAns] = useState("");
    const [isQuizComplete, setIsQuizComplete] = useState(false)

    function submit(e) {
        e.preventDefault();
        let tempArr2 = arr2; //arr2 take ekta tempArr2 te rakhlam
        let lastItem = tempArr2[tempArr2.length - 1]; //ekn tempArr2 er last element tate ans ta assign kora lagbe so lastItem ta ber kore nilam
        lastItem.ans = ans; // then lastItem er ans key te value assing kore dialm jeta ans state a ase. ans kintu input fielder shathe bind kora!
        tempArr2[tempArr2.length - 1] = lastItem; // ekhn lastItem take to amra update korsi mane ans assign korsi but etake to abar tempArr2 er last index eo assign kore update kore dite hobe
        if (arr1.length - 1 >= tempArr2.length) { //arr1 er length jdi tempArr2 er che boro hoi tahole tempArr2 te abar arr1 er porer item ta push korbo amra ok
            let newItemIndex = tempArr2.length;
            tempArr2.push(arr1[newItemIndex]);
        }
        setArr2([...tempArr2]); //ekhn arr2 take amra update kore dibo
        setAns("");

        if (arr1.length == arr2.length && arr2[arr2.length - 1].ans) { // arr1 and arr2 length same hoite hobe abar arr2 er last item a ans thakte hobe
            setIsQuizComplete(true);
        }
    }

    useEffect(() => {
        setArr2([arr1[0]]); // first a arr1 er first element ta arr2 te assign kortesi
    }, [])

    return (
        <div className='p-4'>
            <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                {

                    arr2?.map((el, index) => {
                        {/* arr2 te loop  */ }
                        return (
                            <div key={'QA' + index} className="mb-8">
                                <div className='text-white'>Q{index + 1}: {el?.question}</div> {/* question load koracchhi */}
                                {
                                    (el?.ans) ?
                                        <div className='text-white'>
                                            Ans{index + 1}: {el?.ans} {/* jgula submit kora hoise ogula te to ans ase so ogula dekhabe but jeta latest push kora hoise arr2 te otar to ans nai so oita dekhabe na */}
                                        </div>
                                        : <></>
                                }
                            </div>
                        )
                    })
                }
                {
                    isQuizComplete ?
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                        :
                        <div className='mt-5'>
                            <form onSubmit={submit}>
                                <input type="text" value={ans} onChange={(e) => { setAns(e.target.value) }}></input>
                            </form>
                        </div>
                }
            </div>
        </div>
    )
}
