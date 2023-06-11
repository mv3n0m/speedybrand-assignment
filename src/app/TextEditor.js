import { useEffect } from "react"
import { useQuill } from "react-quilljs"
import BlotFormatter from "quill-blot-formatter"
import "quill/dist/quill.snow.css"


function TextEditor({ content }) {

	const { quill, quillRef, Quill } = useQuill({
		modules: { blotFormatter: {} }
	})

	if (Quill && !quill) {
		Quill.register("modules/blotFormatter", BlotFormatter)
	}

	useEffect(() => {
		if (quill && content) {
			const delta = quill.clipboard.convert(content);
			quill.setContents(delta);
		}
	}, [quill, content]);

	return (
		<div ref={quillRef} />
	)
}

export default TextEditor
