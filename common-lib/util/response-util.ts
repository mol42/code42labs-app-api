class ResponseUtil {
    sendJSON(res, jsonAsString: string): void {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        res.end(jsonAsString);
    }

    sendHTMLString(res, htmlString: string): void {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(htmlString);
    }
}

export default ResponseUtil;
