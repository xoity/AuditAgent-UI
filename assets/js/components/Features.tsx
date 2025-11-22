
const Features = () => {
  return (
    <div className="py-20 bg-base-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why AuditAgent?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Automated Audits</h2>
              <p>Run comprehensive security checks against your servers with a single command.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Smart Remediation</h2>
              <p>Automatically fix compliance issues using AI-driven or rule-based strategies.</p>
            </div>
          </div>
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Policy as Code</h2>
              <p>Define your security policies in simple YAML files and enforce them everywhere.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
