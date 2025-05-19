package view;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import model.Usuario;
import org.json.JSONArray;
import org.json.JSONObject;

@WebServlet(name = "BuscarPessoas", urlPatterns = { "/BuscarPessoas" })
public class BuscarPessoas extends HttpServlet {

    private String getStringSeguro(JSONObject obj, String chave) {
        try {
            if (!obj.isNull(chave)) {
                return obj.getString(chave);
            }
        } catch (Exception e) {
            // Ignorar erro e retornar vazio
        }
        return "";
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html;charset=UTF-8");

        try (PrintWriter out = response.getWriter()) {

            Usuario user;
            HttpSession sessao;
            String apiUrl;
            HttpClient client;
            HttpRequest requestPost;
            HttpResponse<String> responseApi;
            String json;
            JSONArray jsonArray;
            JSONObject obj;

            try {
                sessao = request.getSession(false);

                if (sessao == null) {
                    throw new Exception("É necessário estar logado para acessar essa função.");
                }

                user = (Usuario) sessao.getAttribute("user");
                if (user == null) {
                    throw new Exception("Usuário não encontrado na sessão.");
                }

                apiUrl = "http://127.0.0.1:3000/ListarTodos/";
                client = HttpClient.newHttpClient();

                requestPost = HttpRequest.newBuilder()
                        .uri(URI.create(apiUrl))
                        .header("Content-Type", "application/json")
                        .GET()
                        .build();

                responseApi = client.send(requestPost, HttpResponse.BodyHandlers.ofString());
                json = responseApi.body();

                jsonArray = new JSONArray(json);

                String r1User = (user.getR1() == null) ? "" : user.getR1();
                String r2User = (user.getR2() == null) ? "" : user.getR2();
                String r3User = (user.getR3() == null) ? "" : user.getR3();
                String cpfUsuarioLogado = user.getCpf();

                class PessoaComPontuacao {
                    JSONObject pessoa;
                    int pontuacao;

                    PessoaComPontuacao(JSONObject p, int pt) {
                        this.pessoa = p;
                        this.pontuacao = pt;
                    }
                }

                List<PessoaComPontuacao> listaPessoas = new ArrayList<>();

                for (int i = 0; i < jsonArray.length(); i++) {
                    obj = jsonArray.getJSONObject(i);

                    String cpf = getStringSeguro(obj, "cpf");

                    // Ignorar o próprio usuário logado
                    if (cpf.equals(cpfUsuarioLogado)) {
                        continue;
                    }

                    String r1 = getStringSeguro(obj, "r1");
                    String r2 = getStringSeguro(obj, "r2");
                    String r3 = getStringSeguro(obj, "r3");

                    int pontos = 0;
                    if (r1.equalsIgnoreCase(r1User)) pontos++;
                    if (r2.equalsIgnoreCase(r2User)) pontos++;
                    if (r3.equalsIgnoreCase(r3User)) pontos++;

                    listaPessoas.add(new PessoaComPontuacao(obj, pontos));
                }

                // Ordena sem usar lambda
                Collections.sort(listaPessoas, new Comparator<PessoaComPontuacao>() {
                    @Override
                    public int compare(PessoaComPontuacao p1, PessoaComPontuacao p2) {
                        return Integer.compare(p2.pontuacao, p1.pontuacao); // ordem decrescente
                    }
                });

                // HTML com CSS embutido
                out.println("<html><head><title>Ranking de Usuários</title>");
                out.println("<style>");
                out.println("body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }");
                out.println("h1, h2 { color: #333; }");
                out.println("table { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; }");
                out.println("th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }");
                out.println("th { background-color: #4CAF50; color: white; }");
                out.println("tr:hover { background-color: #f1f1f1; }");
                out.println("a { color: #2196F3; text-decoration: none; }");
                out.println("a:hover { text-decoration: underline; }");
                out.println("ul { background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }");
                out.println("li { margin-bottom: 8px; }");
                out.println("</style></head><body>");

                out.println("<h1>Usuários ordenados pela pontuação</h1>");
                out.println("<table>");
                out.println("<tr><th>Nome</th><th>Pontuação</th></tr>");

                for (PessoaComPontuacao pcp : listaPessoas) {
                    JSONObject p = pcp.pessoa;
                    String cpf = p.getString("cpf");
                    String nome = p.getString("nome");
                    int pts = pcp.pontuacao;

                    out.println("<tr>");
                    out.println("<td><a href='?cpf=" + cpf + "'>" + nome + "</a></td>");
                    out.println("<td>" + pts + "</td>");
                    out.println("</tr>");
                }
                out.println("</table>");

                // Detalhes do usuário clicado
                String cpfDetalhe = request.getParameter("cpf");
                if (cpfDetalhe != null && !cpfDetalhe.isEmpty()) {
                    JSONObject pessoaDetalhada = null;
                    for (int i = 0; i < jsonArray.length(); i++) {
                        obj = jsonArray.getJSONObject(i);
                        if (obj.getString("cpf").equals(cpfDetalhe)) {
                            pessoaDetalhada = obj;
                            break;
                        }
                    }

                    if (pessoaDetalhada != null) {
                        out.println("<h2>Detalhes do usuário: " + pessoaDetalhada.getString("nome") + "</h2>");
                        out.println("<ul>");
                        for (String key : pessoaDetalhada.keySet()) {
                            if (!key.equals("senha")) {
                                out.println("<li><b>" + key + ":</b> " + getStringSeguro(pessoaDetalhada, key) + "</li>");
                            }
                        }
                        out.println("</ul>");
                    } else {
                        out.println("<p>Usuário não encontrado!</p>");
                    }
                }

                out.println("</body></html>");

            } catch (Exception ex) {
                out.println("<html><head><title>Erro</title></head><body>");
                out.println("<h1>Erro: " + ex.getMessage() + "</h1>");
                out.println("</body></html>");
            }

        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Servlet para buscar pessoas e mostrar ranking com pontuação";
    }
}
